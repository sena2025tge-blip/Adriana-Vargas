import React, { useState, useMemo } from 'react';
import { Search, BookOpen, ShieldCheck, CheckCircle2, AlertTriangle, Users, Briefcase, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { SENA_REGULATION_ARTICLES, REGLAMENTO_METRICS } from '../data/senaRegulations';
import { RegulationArticle } from '../types/induction';

export const RegulationExplorer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>('art-derechos-general');

  const filteredArticles = useMemo(() => {
    return SENA_REGULATION_ARTICLES.filter((item) => {
      const matchesCategory =
        selectedCategory === 'todos' || item.category === selectedCategory;

      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.article.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.keyTakeaway.toLowerCase().includes(term) ||
        item.tags.some((t) => t.toLowerCase().includes(term)) ||
        item.content.some((c) => c.toLowerCase().includes(term));

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  const getCategoryIcon = (category: RegulationArticle['category']) => {
    switch (category) {
      case 'derechos':
        return <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'deberes':
        return <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'prohibiciones':
        return <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />;
      case 'comite':
      case 'tramite_faltas':
        return <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />;
      case 'etapa_productiva':
        return <Briefcase className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Explorer Header */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
              Normatividad Institucional Oficial
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Compendio del Reglamento del Aprendiz SENA
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Acuerdo 0009 de 2024 (Reglamento Vigente) y Actualizaciones 2025 (Ley 2466 y Circular 083).
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <span>{REGLAMENTO_METRICS.capitulos} Capítulos</span>
            <span aria-hidden="true">·</span>
            <span>Regla de {REGLAMENTO_METRICS.diasMaxJustificacion} Días Hábiles</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Vigente 2024 - 2025</span>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por artículo, término o falta (ej: plagio, debido proceso, 3 días, bienestar, descargos)..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-xs sm:text-sm"
            />
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedCategory('todos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'todos'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Todos ({SENA_REGULATION_ARTICLES.length})
            </button>
            <button
              onClick={() => setSelectedCategory('derechos')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'derechos'
                  ? 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Derechos
            </button>
            <button
              onClick={() => setSelectedCategory('deberes')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'deberes'
                  ? 'bg-white dark:bg-slate-900 text-blue-800 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Deberes
            </button>
            <button
              onClick={() => setSelectedCategory('prohibiciones')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'prohibiciones'
                  ? 'bg-white dark:bg-slate-900 text-rose-800 dark:text-rose-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Prohibiciones
            </button>
            <button
              onClick={() => setSelectedCategory('comite')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'comite'
                  ? 'bg-white dark:bg-slate-900 text-purple-800 dark:text-purple-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Comité & Faltas
            </button>
            <button
              onClick={() => setSelectedCategory('etapa_productiva')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                selectedCategory === 'etapa_productiva'
                  ? 'bg-white dark:bg-slate-900 text-amber-800 dark:text-amber-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Etapa Práctica
            </button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {filteredArticles.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">No se encontraron artículos</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Prueba buscando otros términos como "asistencia", "derechos", "mejoramiento" o limpia los filtros.
            </p>
          </div>
        ) : (
          filteredArticles.map((art) => {
            const isExpanded = expandedArticleId === art.id;

            return (
              <div
                key={art.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-2xs transition-colors duration-200"
              >
                {/* Header clickable */}
                <button
                  onClick={() => toggleExpand(art.id)}
                  className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 mt-0.5">
                      {getCategoryIcon(art.category)}
                    </div>
                    <div>
                      {/* Unboxed Metadata */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono mb-1">
                        <span>{art.chapter}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{art.article}</span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                        {art.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 line-clamp-2">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-1 text-slate-400 dark:text-slate-500 shrink-0">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fade-in">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                        Disposiciones y Criterios del Artículo
                      </h4>
                      <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 pl-2">
                        {art.content.map((clause, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-2">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">✓</span>
                            <span>{clause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key takeaway */}
                    <div className="p-3.5 rounded-lg bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
                      <strong className="font-semibold text-emerald-800 dark:text-emerald-300">Conclusión Práctica para el Aprendiz: </strong>
                      {art.keyTakeaway}
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                      <span className="text-slate-400 dark:text-slate-500">Palabras clave:</span>
                      {art.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="font-mono text-slate-600 dark:text-slate-400">
                          #{tag}{tIdx < art.tags.length - 1 ? ' ·' : ''}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
