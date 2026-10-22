# Sincronización Automática y Transparente con Google Sheets

Plan de arquitectura y flujo para sincronizar automáticamente el progreso del aprendiz en la hoja de cálculo institucional de Google Sheets (Acuerdo 0009 de 2024 y Ley 2466 de 2025), sin necesidad de configuraciones repetitivas ni intervenciones manuales continuas.

## Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> Decisiones confirmadas por el usuario en la fase de clarificación interactiva:

- **Disparadores de Sincronización Automática**: El prototipo ejecutará la sincronización en segundo plano automáticamente cada vez que el aprendiz apruebe un módulo, resuelva un caso ético o apruebe la evaluación final de certificación.
- **Conexión Transparente**: Se preconfigura la hoja de cálculo institucional (`SENA - Registro y Acreditación de Inducción de Aprendices`), manteniendo la sesión y token en memoria activa y reconectando en segundo plano sin desplegar modales continuos de confirmación en cada acción.
- **Actualización Inteligente (Upsert)**: Si el aprendiz ya cuenta con un registro en la hoja de cálculo (identificado por número de documento o ficha), el sistema actualizará su fila existente en lugar de duplicar renglones, manteniendo su avance consolidado en una sola fila.

---

## 1. Visión General y Propósito

### Qué Hace
Permite que cualquier interacción formativa completada por el aprendiz (módulos pedagógicos, dilemas éticos y evaluación con código QR) viaje automáticamente a la hoja de cálculo institucional en Google Drive sin que el aprendiz o instructor deban presionar botones manuales de guardado o configurar la conexión repetidamente.

### Audiencia Objetivo
- **Aprendices SENA**: Experimentan una plataforma fluida donde su progreso, XP y certificado quedan asegurados en tiempo real.
- **Instructores y Coordinadores Académicos**: Cuentan con una base de datos centralizada en Google Sheets siempre al día para auditoría, control de asistencia y verificación de inducción de 40 horas.

### Valor Central
Eliminación de la fricción manual y garantía de integridad de datos mediante un motor de sincronización automática en segundo plano con lógica de actualización de filas (*upsert*).

---

## 2. Experiencia de Usuario y Diseño Visual

### Flujo de Usuario Automatizado
1. **Acceso Inicial**: Al abrir el prototipo, el sistema detecta la hoja institucional preconfigurada y el estado de autenticación. Si el usuario ya autorizó Google, la sesión se reactiva en silencio.
2. **Progreso Formativo**:
   - Al marcar un módulo como completado: el motor despacha un evento de sincronización en segundo plano.
   - Al resolver un caso del simulador ético: se actualiza el contador de casos y XP en la hoja de cálculo.
   - Al aprobar el examen final: se asienta la nota definitiva, el código hash de certificación y el estado "CERTIFICADO Y ACREDITADO (40H)".
3. **Retroalimentación Visual No Intrusiva**:
   - En lugar de ventanas emergentes o alertas bloqueantes, se muestra un indicador sutil de estado en la cabecera:
     - `● Sincronizando...` (pequeño pulso durante la llamada API).
     - `✓ Sincronizado con Google Sheets · Hace 1m` (confirmación discreta con marca de tiempo).
4. **Respaldo Offline / Cola de Reintentos**: Si se pierde la conexión de red o el token expira, el progreso se almacena localmente y se envía de forma transparente tan pronto como se recupere la conexión.

### Paleta y Jerarquía de Interfaz
- **Fondo Neutral**: Blanco nítido y pizarra profunda en modo oscuro (`bg-slate-50` / `dark:bg-slate-950`).
- **Acentos Institucionales**: Verde esmeralda SENA (`#39a900` / `emerald-700`) para estados nominales y confirmaciones de sincronización.
- **Tipografía y Legibilidad**: `Plus Jakarta Sans` para textos y titulares, con cifras tabulares monoespaciadas (`font-mono tabular-nums`) para números de documento, ficha y horas de acreditación.

---

## 3. Decisiones de Producto y Compensaciones Técnicas

### 1. Upsert (Actualización de Fila vs. Inserción Continua)
- **Decisión**: Se implementa lógica de búsqueda previa en el rango `Registro_Induccion!A2:O500`. Si coincide `docNumber` o `fichaNumber`, se actualiza la fila específica (`PUT /values/Registro_Induccion!A{index}:O{index}`); de lo contrario, se anexa al final (`POST /values/Registro_Induccion!A1:append`).
- **Por qué**: Evita saturar la hoja con decenas de filas para un solo estudiante y permite a los instructores ver el estado actual del aprendiz en un solo renglón consolidado.

### 2. Sincronización en Segundo Plano con Desacoplamiento (Non-blocking)
- **Decisión**: Las funciones de finalización de módulos, casos y examen actualizan inmediatamente el estado local (React state + `localStorage`) y lanzan la promesa de sincronización en segundo plano (`async / await` no bloqueante) sin congelar la interfaz ni abrir modales de confirmación.
- **Por qué**: Brinda una experiencia de usuario rápida y sin interrupciones, cumpliendo el requerimiento de no tener que interactuar con la configuración en cada paso.

### 3. Persistencia de Metadatos de la Hoja
- **Decisión**: Se almacena el `spreadsheetId` institucional y la URL en caché local con una plantilla estándar predeterminada para que el prototipo siempre sepa a qué hoja apuntar sin reconfiguración manual.

---

## 4. Arquitectura Técnica y Estrategia de Datos

### Diagrama de Arquitectura de Sincronización

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        PROTOTIPO SENA (React SPA)                      │
│                                                                        │
│   ┌─────────────────────┐   ┌───────────────────┐   ┌──────────────┐   │
│   │ Módulos de Inducción│   │Casos Éticos (Sim) │   │ Examen Final │   │
│   └──────────┬──────────┘   └─────────┬─────────┘   └───────┬──────┘   │
│              │                        │                     │          │
│              ▼                        ▼                     ▼          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │           Auto-Sync Dispatcher (Motor de Sincronización)       │   │
│   │   - Debounce & Cola de Eventos                                 │   │
│   │   - Generación de Registro Estructurado (ApprenticeSheetRecord)│   │
│   └───────────────────────────────┬────────────────────────────────┘   │
│                                   │                                    │
│              ┌────────────────────┴───────────────────┐                │
│              ▼                                        ▼                │
│   ┌──────────────────────┐                ┌──────────────────────┐     │
│   │  Estado Local React  │                │ Google Sheets Service│     │
│   │    + localStorage    │                │  (OAuth Bearer Token)│     │
│   └──────────────────────┘                └───────────┬──────────┘     │
└───────────────────────────────────────────────────────┼────────────────┘
                                                        │ HTTPS
                                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     GOOGLE DRIVE & SHEETS CLOUD                        │
│                                                                        │
│   Hoja: "SENA - Registro y Acreditación de Inducción de Aprendices"    │
│   Pestaña: "Registro_Induccion"                                        │
│                                                                        │
│   1. Buscar si existe fila con Documento / Ficha                       │
│      ├── Si existe  ──► UPDATE fila existente (PUT A{N}:O{N})          │
│      └── Si es nuevo ──► APPEND nueva fila al final (POST :append)     │
└────────────────────────────────────────────────────────────────────────┘
```

### Mapeo de Campos y Columnas en Google Sheets
1. `A`: Fecha y Hora de Sincronización
2. `B`: Nombre Completo del Aprendiz
3. `C`: Tipo de Documento (`CC`, `TI`, `CE`, `PPT`)
4. `D`: Número de Documento
5. `E`: Ficha de Caracterización
6. `F`: Programa de Formación
7. `G`: Regional SENA
8. `H`: Centro de Formación
9. `I`: Progreso de Módulos (ej. `5/5 (100%)`)
10. `J`: Progreso de Casos Éticos (ej. `6/6`)
11. `K`: Nota de Examen (ej. `90% · APROBADO`)
12. `L`: Puntos de Experiencia (XP)
13. `M`: Estado de Certificación (`CERTIFICADO Y ACREDITADO (40H)`)
14. `N`: Código Hash Único de Verificación
15. `O`: Fecha de Emisión Oficial

### Manejadores y Funciones Clave a Implementar
- `syncApprenticeAutomatically(record)`: Función orquestadora central en `googleSheetsService.ts` que consulta la hoja y ejecuta la actualización (update) o anexión (append).
- `updateApprenticeRowInSheet(token, spreadsheetId, rowIndex, record)`: Llamada a la API de Google Sheets (`PUT /values/Registro_Induccion!A{rowIndex}:O{rowIndex}?valueInputOption=USER_ENTERED`).
- `useAutoSync`: Hook o efecto unificado que conecta las acciones de completado de módulos, casos y examen directamente al orquestador.
- `AutoSyncStatusBadge`: Componente visual en el Header que refleja en tiempo real el estado de sincronización (*Sincronizando...*, *Al día*, *Sin conexión*).
