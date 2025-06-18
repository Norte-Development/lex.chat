import { LoaderIcon, FileIcon, CheckCircleFillIcon, WarningIcon } from './icons';

interface GetFullNormativeCallProps {
  args: {
    documentId: string;
    jurisdiction?: string;
  };
  isReadonly: boolean;
}

export function GetFullNormativeCall({ args, isReadonly }: GetFullNormativeCallProps) {
  const { documentId, jurisdiction } = args;
  
  return (
    <div className="border py-3 px-4 rounded-xl flex items-center gap-3">
      <div className="text-muted-foreground">
        <LoaderIcon size={16} />
      </div>
      <div className="flex-1">
        <div className="font-medium">Obteniendo normativa completa</div>
        <div className="text-sm text-muted-foreground">
          Documento ID: {documentId}
        </div>
        {jurisdiction && (
          <div className="text-xs text-muted-foreground mt-1">
            Jurisdicción: {jurisdiction}
          </div>
        )}
      </div>
    </div>
  );
}

interface GetFullNormativeResultProps {
  result: {
    success: boolean;
    document?: {
      content: string;
      title: string;
      category: string;
      number: string;
      url: string;
      isMarkdown: boolean;
      jurisdiction: string;
    };
    message?: string;
    error?: string;
  };
  isReadonly: boolean;
}

export function GetFullNormativeResult({ result, isReadonly }: GetFullNormativeResultProps) {
  const { success, document, message, error } = result;

  if (error || !success) {
    return (
      <div className="border py-3 px-4 rounded-xl border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-600">
          <WarningIcon size={16} />
          <span className="font-medium">Error al obtener normativa</span>
        </div>
        <div className="text-sm text-red-600 mt-1">{error || 'Error desconocido'}</div>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="border py-3 px-4 rounded-xl">
        <div className="flex items-center gap-2">
          <FileIcon size={16} />
          <span className="font-medium">Normativa obtenida</span>
        </div>
        <div className="text-sm text-muted-foreground mt-1">
          {message || 'Documento obtenido exitosamente'}
        </div>
      </div>
    );
  }

  return (
    <div className="border py-3 px-4 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircleFillIcon size={16} />
        <span className="font-medium">Normativa completa obtenida</span>
      </div>
      
      <div className="space-y-2 mb-3">
        <div className="text-sm">
          <span className="font-medium">Título:</span> {document.title}
        </div>
        <div className="text-sm">
          <span className="font-medium">Número:</span> {document.number}
        </div>
        <div className="text-sm">
          <span className="font-medium">Categoría:</span> {document.category}
        </div>
        <div className="text-sm">
          <span className="font-medium">Jurisdicción:</span> {document.jurisdiction}
        </div>
      </div>

      <div className="mt-3 p-3 bg-gray-50 rounded text-xs max-h-40 overflow-y-auto">
        <div className="font-medium mb-2">Contenido:</div>
        <div 
          className="text-muted-foreground"
          dangerouslySetInnerHTML={{ 
            __html: document.content.length > 500 
              ? document.content.substring(0, 500) + '...' 
              : document.content 
          }}
        />
      </div>

      {message && (
        <div className="text-sm text-muted-foreground mt-2 p-2 bg-blue-50 rounded">
          {message}
        </div>
      )}
    </div>
  );
} 