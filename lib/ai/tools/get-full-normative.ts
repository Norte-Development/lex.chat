import { tool } from 'ai';
import { z } from 'zod';
import { admin, bucket, db as adminDb } from '@/lib/firebase/firebase';
import { JSDOM } from 'jsdom';


interface returnObject {
  content: string;
  title: string;
  category?: string;
  number?: string;
  isMarkdown: boolean; // Flag for content type
  url?: string; // Optional URL
}

export const getFullNormative = tool({
  description: 'Obtiene el texto completo de una normativa legal específica usando su ID de documento.',
  parameters: z.object({
    documentId: z.string().describe('El ID del documento normativo'),
    jurisdiction: z.string().optional().describe('La jurisdicción del documento (opcional)'),
  }),
  execute: async ({ documentId, jurisdiction }) => {
    try {
      const document = await getHtmlFromDocument(documentId, jurisdiction);
      console.log(document);

      return {
        success: true,
        document: document,
        message: `Documento normativo ${documentId} obtenido exitosamente`
      };
    } catch (error) {
      console.error('Error fetching normative document:', error);
      return {
        success: false,
        message: 'Error al obtener el documento normativo',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  },
}); 


const getJurisdiccionDocument = async (
  jurisdiccion: string,
  documentId: string
): Promise<returnObject> => {
  try {
    // Normalize jurisdiction name for collection (e.g., corrientes -> Corrientes)
    const collectionName = `legislacion_${jurisdiccion}`;

    console.log(collectionName)

    // Get the document from Firestore using Admin SDK
    const docRef = adminDb.collection(collectionName).doc(documentId);
    const docSnap = await docRef.get();

    if (docSnap.exists) { // Correctly use the 'exists' property
      const data = docSnap.data();
      console.log(data)
      if (data) {
        return {
          content: data.content || '', // Markdown content
          title: data.title || '',
          category: data.type || '',
          number: data.number || '',
          url: data.url || '',
          isMarkdown: true, // Mark as Markdown
        };
      } else {
        throw new Error(`Document data is undefined in ${collectionName}`);
      }
    } else {
      throw new Error(`Document ${documentId} not found in ${collectionName}`);
    }
  } catch (error: any) {
    console.error(`Error fetching jurisdiccion document from ${jurisdiccion}/${documentId}:`, error);
    throw new Error(`Error fetching jurisdiccion document: ${error.message || error}`);
  }
};


const getHtmlFromDocument = async (
  documentId: string,
  jurisdiccion?: string // Optional jurisdiction parameter
): Promise<returnObject> => {
  // If jurisdiction is provided and not 'nacional', fetch markdown
  if (jurisdiccion && jurisdiccion !== 'nacional') {
    try {
      return await getJurisdiccionDocument(jurisdiccion, documentId);
    } catch (error) {
      console.error(`Failed to get markdown for provincial document ${jurisdiccion}/${documentId}, attempting fallback:`, error);
      // Optional: Add fallback logic here if provincial fails (e.g., try national bucket/store?)
      // For now, let's try the national bucket/store as a fallback
       // Fall through to national logic
    }
  }

  // --- Logic for 'nacional' or undefined jurisdiction OR fallback --- 
  try {
    // Try fetching HTML from Bucket first
    const file = bucket.file(`norma/${documentId}.html`);
    const fileDownloadPromise = file.download();
    const docRef = adminDb.collection('legalDocuments').doc(documentId);
    const docSnapshotPromise = docRef.get();

    const [data, docSnapshot] = await Promise.all([
      fileDownloadPromise,
      docSnapshotPromise,
    ]);

    const legalDoc = docSnapshot.data();
    const title = legalDoc?.title || '';
    const category = legalDoc?.category || '';
    const number = legalDoc?.number || '';
    const url = legalDoc?.url || '';

    const htmlContent = data[0].toString('latin1'); // Assuming latin1, adjust if needed
    const dom = new JSDOM(htmlContent);
    const document = dom.window.document;
    const documentBody = document.body.innerHTML.replace(/&shy;/g, '-');

    return {
      content: documentBody,
      title: title,
      category: category,
      number: number,
      isMarkdown: false, // HTML content
      url: url,
    };
  } catch (bucketError) {
    console.error(`HTML not found in bucket for ${documentId}`);
    throw new Error(`HTML not found in bucket for ${documentId}`);
  }
};