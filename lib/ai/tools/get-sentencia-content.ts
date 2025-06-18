import { tool } from 'ai';
import { z } from 'zod';
import { WebPDFLoader } from '@langchain/community/document_loaders/web/pdf';



async function getSentenciaDocument(
  documentUrl: string,
): Promise<string> {
  try {
    const response = await fetch(documentUrl);

    if (!response.ok) {
      throw new Error(`Error al obtener el documento: ${response.statusText}`);
    }

    const blob = await response.blob();
    const doc = new WebPDFLoader(blob, {
      splitPages: false,
    });

    const data = await doc.load();
    return data[0].pageContent;
  } catch (error) {
    console.error('Error al obtener o analizar el PDF:', error);
    throw error;
  }
}

export const getSentenciaContent = tool({
  description: 'Obtiene el contenido completo de una sentencia judicial desde su URL de PDF.',
  parameters: z.object({
    url: z.string().describe('La URL del PDF de la sentencia'),
  }),
  execute: async ({ url }) => {
    try {
      console.log(`Fetching sentencia content from: ${url}`);

      const content = await getSentenciaDocument(url);

      return {
        success: true,
        content: content,
        url: url,
        message: 'Contenido de la sentencia obtenido exitosamente'
      };
    } catch (error) {
      console.error('Error fetching sentencia content:', error);
      return {
        success: false,
        message: 'Error al obtener el contenido de la sentencia',
        error: error instanceof Error ? error.message : 'Unknown error',
        url: url
      };
    }
  },
}); 