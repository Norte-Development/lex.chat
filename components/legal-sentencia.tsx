import { LoaderIcon, FileIcon, CheckCircleFillIcon, WarningIcon } from './icons';

interface GetSentenciaContentCallProps {
  args: {
    url: string;
  };
  isReadonly: boolean;
}

export function GetSentenciaContentCall({ args, isReadonly }: GetSentenciaContentCallProps) {
  const { url } = args;
  
  return (
    <div className="border py-3 px-4 rounded-xl flex items-center gap-3">
      <div className="text-muted-foreground">
        <LoaderIcon size={16} />
      </div>
      <div className="flex-1">
        <div className="font-medium">Extrayendo contenido de sentencia</div>
        <div className="text-sm text-muted-foreground">
          Procesando PDF desde: {new URL(url).hostname}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {url}
        </div>
      </div>
    </div>
  );
}

interface GetSentenciaContentResultProps {
  result: {
    success: boolean;
    content?: string;
    url: string;
    message?: string;
    error?: string;
  };
  isReadonly: boolean;
}

export function GetSentenciaContentResult({ result, isReadonly }: GetSentenciaContentResultProps) {
  const { success, content, url, message, error } = result;

  if (error || !success) {
    return (
      <div className="border py-3 px-4 rounded-xl border-red-200 bg-red-50">
        <div className="flex items-center gap-2 text-red-600 mb-2">
          <WarningIcon size={16} />
          <span className="font-medium">Error al procesar sentencia</span>
        </div>
        <div className="text-sm text-red-600 mb-2">{error || 'Error desconocido'}</div>
        <div className="text-xs text-muted-foreground">
          URL: {url}
        </div>
      </div>
    );
  }

  return (
    <div className="border py-3 px-4 rounded-xl">
      <div className="flex items-center gap-2 mb-3">
        <CheckCircleFillIcon size={16} />
        <span className="font-medium">Contenido de sentencia extraído</span>
      </div>
      
      <div className="text-sm text-muted-foreground mb-3">
        <span className="font-medium">Fuente:</span> {new URL(url).hostname}
      </div>

      {content && (
        <div className="mt-3 p-3 bg-gray-50 rounded text-xs max-h-60 overflow-y-auto">
          <div className="font-medium mb-2">Contenido de la sentencia:</div>
          <div className="text-muted-foreground whitespace-pre-wrap">
            {content.length > 1000 
              ? content.substring(0, 1000) + '\n\n[...contenido truncado...]' 
              : content
            }
          </div>
        </div>
      )}

      {message && (
        <div className="text-sm text-muted-foreground mt-2 p-2 bg-blue-50 rounded">
          {message}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Ver documento original
        </a>
      </div>
    </div>
  );
} 