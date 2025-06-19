import { Artifact } from '@/components/create-artifact';
import {
  CopyIcon,
  LineChartIcon,
  RedoIcon,
  SparklesIcon,
  UndoIcon,
} from '@/components/icons';
import { SpreadsheetEditor } from '@/components/sheet-editor';
import { parse, unparse } from 'papaparse';
import { toast } from 'sonner';

type Metadata = any;

export const sheetArtifact = new Artifact<'sheet', Metadata>({
  kind: 'sheet',
  description: 'Útil para trabajar con hojas de cálculo',
  initialize: async () => {},
  onStreamPart: ({ setArtifact, streamPart }) => {
    if (streamPart.type === 'sheet-delta') {
      setArtifact((draftArtifact) => ({
        ...draftArtifact,
        content: streamPart.content as string,
        isVisible: true,
        status: 'streaming',
      }));
    }
  },
  content: ({
    content,
    currentVersionIndex,
    isCurrentVersion,
    onSaveContent,
    status,
  }) => {
    return (
      <SpreadsheetEditor
        content={content}
        currentVersionIndex={currentVersionIndex}
        isCurrentVersion={isCurrentVersion}
        saveContent={onSaveContent}
        status={status}
      />
    );
  },
  actions: [
    {
      icon: <UndoIcon size={18} />,
      description: 'Ver versión anterior',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('prev');
      },
      isDisabled: ({ currentVersionIndex }) => {
        if (currentVersionIndex === 0) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <RedoIcon size={18} />,
      description: 'Ver siguiente versión',
      onClick: ({ handleVersionChange }) => {
        handleVersionChange('next');
      },
      isDisabled: ({ isCurrentVersion }) => {
        if (isCurrentVersion) {
          return true;
        }

        return false;
      },
    },
    {
      icon: <CopyIcon />,
      description: 'Copiar como .csv',
      onClick: ({ content }) => {
        const parsed = parse<string[]>(content, { skipEmptyLines: true });

        const nonEmptyRows = parsed.data.filter((row) =>
          row.some((cell) => cell.trim() !== ''),
        );

        const cleanedCsv = unparse(nonEmptyRows);

        navigator.clipboard.writeText(cleanedCsv);
        toast.success('¡CSV copiado al portapapeles!');
      },
    },
  ],
  toolbar: [
    {
      description: 'Formatear y limpiar datos',
      icon: <SparklesIcon />,
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content: '¿Podrías formatear y limpiar los datos?',
        });
      },
    },
    {
      description: 'Analizar y visualizar datos',
      icon: <LineChartIcon />,
      onClick: ({ appendMessage }) => {
        appendMessage({
          role: 'user',
          content:
            '¿Podrías analizar y visualizar los datos creando un nuevo artefacto de código en python?',
        });
      },
    },
  ],
});
