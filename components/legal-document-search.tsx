import { LoaderIcon, FileIcon, MessageIcon } from './icons';

interface DocumentSearchCallProps {
  args: {
    query: string;
    filters?: {
      categories?: string[];
      startDate?: string;
      endDate?: string;
      jurisdiction?: string;
      provincia?: string;
      documentTypes?: string[];
      maxResults?: number;
    };
  };
  isReadonly: boolean;
}

export function DocumentSearchCall({ args, isReadonly }: DocumentSearchCallProps) {
  const { query, filters } = args;
  
  return (
    <div className="border py-3 px-4 rounded-xl flex items-center gap-3">
      <div className="text-muted-foreground">
        <LoaderIcon size={16} />
      </div>
      <div className="flex-1">
        <div className="font-medium">Buscando documentos legales</div>
        <div className="text-sm text-muted-foreground">
          Consulta: &ldquo;{query}&rdquo;
        </div>
        {filters && (
          <div className="text-xs text-muted-foreground mt-1">
            {filters.documentTypes && (
              <span>Tipos: {filters.documentTypes.join(', ')} • </span>
            )}
            {filters.provincia && (
              <span>Provincia: {filters.provincia} • </span>
            )}
            {filters.categories && (
              <span>Categorías: {filters.categories.join(', ')}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface DocumentSearchResultProps {
  result: {
    sentencias?: Array<{
      title: string;
      text: string;
      date: string;
      jurisdiction: string;
      url: string;
      relevanceScore?: number;
    }>;
    normativas?: Array<{
      title: string;
      text: string;
      category: string;
      number: string;
      date: string;
      url?: string;
      relevanceScore?: number;
    }>;
    message?: string;
    error?: string;
  };
  isReadonly: boolean;
}

export function DocumentSearchResult({ result, isReadonly }: DocumentSearchResultProps) {
  const { sentencias = [], normativas = [], message, error } = result;
  const totalResults = sentencias.length + normativas.length;

  // Debug logging
  console.log('DocumentSearchResult - normativas:', normativas);
  console.log('DocumentSearchResult - normativas URLs:', normativas.map(n => ({ title: n.title, url: n.url })));

  if (error) {
    return (
      <div className="border py-3 px-4 rounded-xl border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-600">
          <FileIcon size={16} />
          <span className="font-medium">Error en búsqueda legal</span>
        </div>
        <div className="text-sm text-red-600 mt-1">{error}</div>
      </div>
    );
  }

  return (
    <div className="border py-3 px-4 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <FileIcon size={16} />
        <span className="font-medium">Resultados de búsqueda legal</span>
        <span className="text-sm text-muted-foreground">
          ({totalResults} documentos encontrados)
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {sentencias.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileIcon size={16} />
              <span className="text-sm font-medium">Sentencias ({sentencias.length})</span>
            </div>
            <div className="space-y-2 ml-6">
              {sentencias.map((sentencia, index) => (
                <div key={index} className="text-sm border-l-2 border-blue-200 pl-2">
                  <div className="font-medium">
                    {sentencia.url ? (
                      <a 
                        href={sentencia.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {sentencia.title}
                      </a>
                    ) : (
                      sentencia.title
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    {sentencia.jurisdiction} • {sentencia.date}
                    {sentencia.relevanceScore && (
                      <span className="ml-2 text-xs">
                        (relevancia: {Math.round(sentencia.relevanceScore * 100)}%)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {sentencia.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {normativas.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageIcon size={16} />
              <span className="text-sm font-medium">Normativas ({normativas.length})</span>
            </div>
            <div className="space-y-2 ml-6">
              {normativas.map((normativa, index) => (
                <div key={index} className="text-sm border-l-2 border-green-200 pl-2">
                  <div className="font-medium">
                    {normativa.url ? (
                      <a 
                        href={normativa.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {normativa.category} {normativa.title}
                      </a>
                    ) : (
                      <span>{normativa.title} (no URL: {JSON.stringify(normativa.url)})</span>
                    )}
                  </div>
                  <div className="text-muted-foreground">
                    {normativa.number} • {normativa.category} • {normativa.date}
                    {normativa.relevanceScore && (
                      <span className="ml-2 text-xs">
                        (relevancia: {Math.round(normativa.relevanceScore * 100)}%)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2">
                    {normativa.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {totalResults === 0 && !error && (
        <div className="text-center text-muted-foreground py-4">
          No se encontraron documentos legales para esta consulta
        </div>
      )}
    </div>
  );
} 