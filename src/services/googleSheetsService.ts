import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  User,
  signOut,
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import { ApprenticeSheetRecord, GoogleSheetSyncInfo } from '../types/induction';

// Initialize Firebase App singleton
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Configure Google Auth Provider with Drive & Sheets scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/spreadsheets',
  'https://www.googleapis.com/auth/drive.file',
];

const provider = new GoogleAuthProvider();
SCOPES.forEach((scope) => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'select_account',
});

// In-memory token cache (NEVER stored in localStorage or sessionStorage)
let isSigningIn = false;
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('No se pudo obtener el token de acceso de Google');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: unknown) {
    console.error('Error al iniciar sesión con Google:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutGoogle = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// Spreadsheet Name standard
export const SPREADSHEET_TITLE = 'SENA - Registro y Acreditación de Inducción de Aprendices';
export const SHEET_TAB_NAME = 'Registro_Induccion';

export const SHEET_HEADERS = [
  'Fecha y Hora Registro',
  'Nombre Completo',
  'Tipo Documento',
  'Número Documento',
  'Ficha Formación',
  'Programa de Formación',
  'Regional',
  'Centro de Formación',
  'Módulos Completados',
  'Casos Éticos Resueltos',
  'Nota Evaluación (%)',
  'Puntos XP',
  'Estado Certificación',
  'Código Verificación',
  'Fecha Expedición Certificado',
];

/**
 * Searches user's Google Drive for existing induction spreadsheet, or creates a new one.
 */
export const findOrCreateApprenticesSpreadsheet = async (
  accessToken: string
): Promise<GoogleSheetSyncInfo> => {
  // 1. Search Google Drive for existing file
  const searchUrl = `https://www.googleapis.com/drive/v3/files?q=name='${encodeURIComponent(
    SPREADSHEET_TITLE
  )}' and mimeType='application/vnd.google-apps.spreadsheet' and trashed=false&fields=files(id,name,webViewLink)`;

  const searchRes = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!searchRes.ok) {
    const errText = await searchRes.text();
    throw new Error(`Error al buscar en Google Drive: ${errText}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    const existingFile = searchData.files[0];
    return {
      spreadsheetId: existingFile.id,
      spreadsheetTitle: existingFile.name,
      sheetUrl: existingFile.webViewLink || `https://docs.google.com/spreadsheets/d/${existingFile.id}/edit`,
    };
  }

  // 2. If not found, create new Google Spreadsheet with structured headers
  const createUrl = 'https://sheets.googleapis.com/v4/spreadsheets';
  const createPayload = {
    properties: {
      title: SPREADSHEET_TITLE,
    },
    sheets: [
      {
        properties: {
          title: SHEET_TAB_NAME,
          gridProperties: {
            frozenRowCount: 1,
          },
        },
        data: [
          {
            startRow: 0,
            startColumn: 0,
            rowData: [
              {
                values: SHEET_HEADERS.map((header) => ({
                  userEnteredValue: { stringValue: header },
                  userEnteredFormat: {
                    textFormat: { bold: true, foregroundColor: { red: 0.1, green: 0.45, blue: 0.15 } },
                    backgroundColor: { red: 0.92, green: 0.98, blue: 0.92 },
                  },
                })),
              },
            ],
          },
        ],
      },
    ],
  };

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(createPayload),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Error al crear la hoja en Google Sheets: ${errText}`);
  }

  const newSheetData = await createRes.json();
  return {
    spreadsheetId: newSheetData.spreadsheetId,
    spreadsheetTitle: newSheetData.properties?.title || SPREADSHEET_TITLE,
    sheetUrl:
      newSheetData.spreadsheetUrl ||
      `https://docs.google.com/spreadsheets/d/${newSheetData.spreadsheetId}/edit`,
  };
};

/**
 * Appends a new apprentice record row to the Google Sheet.
 */
export const appendApprenticeToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  record: ApprenticeSheetRecord
): Promise<void> => {
  const rowValues = [
    record.timestamp,
    record.fullName,
    record.docType,
    record.docNumber,
    record.fichaNumber,
    record.programName,
    record.regional,
    record.centroFormacion,
    record.modulesProgress,
    record.scenariosProgress,
    record.examScore,
    record.totalXp,
    record.certificationStatus,
    record.verificationCode,
    record.issueDate,
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    `${SHEET_TAB_NAME}!A1`
  )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al registrar en Google Sheets: ${err}`);
  }
};

/**
 * Updates an existing apprentice record row at a 1-based row index in Google Sheets.
 */
export const updateApprenticeRowInSheet = async (
  accessToken: string,
  spreadsheetId: string,
  rowNumber: number,
  record: ApprenticeSheetRecord
): Promise<void> => {
  const rowValues = [
    record.timestamp,
    record.fullName,
    record.docType,
    record.docNumber,
    record.fichaNumber,
    record.programName,
    record.regional,
    record.centroFormacion,
    record.modulesProgress,
    record.scenariosProgress,
    record.examScore,
    record.totalXp,
    record.certificationStatus,
    record.verificationCode,
    record.issueDate,
  ];

  const updateUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    `${SHEET_TAB_NAME}!A${rowNumber}:O${rowNumber}`
  )}?valueInputOption=USER_ENTERED`;

  const res = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      range: `${SHEET_TAB_NAME}!A${rowNumber}:O${rowNumber}`,
      values: [rowValues],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al actualizar fila en Google Sheets: ${err}`);
  }
};

/**
 * Intelligent Upsert: Searches for an existing apprentice by document number or ficha number.
 * If found, updates the row in place. If not found, appends a new row.
 */
export const upsertApprenticeToSheet = async (
  accessToken: string,
  spreadsheetId: string,
  record: ApprenticeSheetRecord
): Promise<{ action: 'updated' | 'created'; rowNumber: number }> => {
  // Read current sheet rows to find match
  const range = `${SHEET_TAB_NAME}!A2:O500`;
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}`;

  const res = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al leer datos para sincronización: ${err}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  // Match by docNumber (Column D, index 3) or combination with fichaNumber (Column E, index 4)
  const targetDoc = (record.docNumber || '').trim();
  const targetFicha = (record.fichaNumber || '').trim();

  let existingRowIndex = -1;
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowDoc = (row[3] || '').trim();
    const rowFicha = (row[4] || '').trim();

    if (targetDoc && rowDoc === targetDoc) {
      existingRowIndex = i + 2; // +2 because range starts at row 2 (1-indexed)
      break;
    } else if (targetFicha && rowFicha === targetFicha && row[1]?.trim() === record.fullName?.trim()) {
      existingRowIndex = i + 2;
      break;
    }
  }

  if (existingRowIndex !== -1) {
    await updateApprenticeRowInSheet(accessToken, spreadsheetId, existingRowIndex, record);
    return { action: 'updated', rowNumber: existingRowIndex };
  } else {
    await appendApprenticeToSheet(accessToken, spreadsheetId, record);
    return { action: 'created', rowNumber: rows.length + 2 };
  }
};

/**
 * Automatically syncs the apprentice record using upsert logic in the background.
 * If accessToken or spreadsheetId is missing, safely queues for next connection.
 */
export const syncApprenticeAutomatically = async (
  record: ApprenticeSheetRecord,
  explicitToken?: string | null,
  explicitSpreadsheetId?: string | null
): Promise<{
  success: boolean;
  action?: 'updated' | 'created' | 'queued';
  message: string;
  timestamp: string;
}> => {
  const token = explicitToken || cachedAccessToken;

  let sheetId = explicitSpreadsheetId;
  if (!sheetId) {
    const saved = localStorage.getItem('sena_google_sheet_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        sheetId = parsed.spreadsheetId;
      } catch (e) {
        // ignore
      }
    }
  }

  const nowIso = new Date().toISOString();

  if (!token || !sheetId) {
    localStorage.setItem('sena_pending_sheet_sync', JSON.stringify({ record, queuedAt: nowIso }));
    return {
      success: false,
      action: 'queued',
      message: 'Guardado localmente. Listo para sincronizar al conectar Google.',
      timestamp: nowIso,
    };
  }

  try {
    const result = await upsertApprenticeToSheet(token, sheetId, record);
    localStorage.removeItem('sena_pending_sheet_sync');
    const syncTime = new Date().toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
    localStorage.setItem(
      'sena_last_auto_sync',
      JSON.stringify({
        timestamp: syncTime,
        action: result.action,
        rowNumber: result.rowNumber,
      })
    );

    return {
      success: true,
      action: result.action,
      message:
        result.action === 'updated'
          ? `Fila ${result.rowNumber} actualizada automáticamente`
          : `Nuevo registro creado en fila ${result.rowNumber}`,
      timestamp: syncTime,
    };
  } catch (err: unknown) {
    console.error('Error en sincronización automática:', err);
    localStorage.setItem('sena_pending_sheet_sync', JSON.stringify({ record, queuedAt: nowIso }));
    const msg = err instanceof Error ? err.message : 'Error de sincronización';
    return {
      success: false,
      message: msg,
      timestamp: nowIso,
    };
  }
};

/**
 * Reads all stored apprentice records from the Google Sheet.
 */
export const fetchApprenticesFromSheet = async (
  accessToken: string,
  spreadsheetId: string
): Promise<ApprenticeSheetRecord[]> => {
  const range = `${SHEET_TAB_NAME}!A2:O500`;
  const getUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(
    range
  )}`;

  const res = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Error al leer datos de Google Sheets: ${err}`);
  }

  const data = await res.json();
  const rows: string[][] = data.values || [];

  return rows.map((row) => ({
    timestamp: row[0] || '',
    fullName: row[1] || '',
    docType: row[2] || '',
    docNumber: row[3] || '',
    fichaNumber: row[4] || '',
    programName: row[5] || '',
    regional: row[6] || '',
    centroFormacion: row[7] || '',
    modulesProgress: row[8] || '',
    scenariosProgress: row[9] || '',
    examScore: row[10] || '',
    totalXp: Number(row[11]) || 0,
    certificationStatus: row[12] || '',
    verificationCode: row[13] || '',
    issueDate: row[14] || '',
  }));
};


