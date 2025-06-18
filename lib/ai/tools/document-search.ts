import cohere from '@/lib/cohere/utils';
import { z } from 'zod';
import client from "@/lib/mongodb/mongoClient";
import { MongoClient } from "mongodb";
import { tool } from 'ai';

import { OpenAI } from "openai";

export interface Jurisdiction {
  id: string;
  name: string;
}

export const JURISDICTIONS: Jurisdiction[] = [
  { id: 'nacional', name: 'Nacional' },
  { id: 'chaco', name: 'Chaco' },
  { id: 'corrientes', name: 'Corrientes' },
  { id: 'misiones', name: 'Misiones' },
  { id: 'formosa', name: 'Formosa' },
  { id: 'caba', name: 'Ciudad Autónoma de Buenos Aires' },
  // TODO: Add more provinces as needed
];


export const provincias = z.enum(JURISDICTIONS.map(j => j.id) as [string, ...string[]]);

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export const NormativaCategory = z.enum([
  'ley',
  'decreto',
  'codigo',
  'resolución',
  'acuerdo',
  'circular',
  'comunicación',
  'instrucción',
  'convenio',
  'decisión administrativa',
  'disposición',
  'decisión',
  'directiva',
  'interpretación',
  'protocolo',
  'providencia',
  'recomendación',
  'constitucion',
  'laudo',
]);

export const DocumentType = z.enum(['normativas', 'sentencias', 'personales']);

export type DocumentTypeType = z.infer<typeof DocumentType>;

export type NormativaCategoryType = z.infer<typeof NormativaCategory>;

export interface SearchResult {
  title?: string;
  text: string;
  type: 'sentencia' | 'normativa' | 'documento';
  category?: string;
  number?: string;
  date?: string;
  jurisdiction?: string;
  fileName?: string;
  url?: string;
  relevanceScore?: number;
}

export interface SearchResults {
  sentencias: SearchResult[];
  normativas: (SearchResult | InfoMessage)[];
  message?: string;
  filters?: SearchFilters;
}

export interface SearchFilters {
  categories?: NormativaCategoryType[];
  startDate?: string;
  endDate?: string;
  jurisdiction?: string;
  provincia?: string;
  documentTypes?: DocumentTypeType[];
  maxResults?: number;
}

export interface InfoMessage {
  type: 'documento';
  id: string;
  isInfoMessage?: boolean;
  content: string;
  text: string; 
  title?: string;
  organismo?: string;
  numero_normativa?: string;
  fecha_sancion?: string;
}

const queryLegal = async (query: string, category?: string | string[], jurisdiccion?: string, startDate?: Date, endDate?: Date) => {
  try {
   const response = await fetch(`${process.env.QDRANT_SEARCH_API_URL}/search` || '', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.QDRANT_SEARCH_API_KEY}`,
      'X-API-Key': `${process.env.QDRANT_SEARCH_API_KEY}`
    },
    body: JSON.stringify({query, category, jurisdiccion, startDate: startDate?.toISOString().split('T')[0], endDate: endDate?.toISOString().split('T')[0]})
   })

   const data = await response.json();
   if (!data.results) {
    return []
   }

   console.log(data.results);
  
   const result = data.results?.map((item: any) => {
    return {
    _id: item.id,
    text: item.text,
    category: item.category,
    number: item.number,
    index: item.index,
    documentId: item.document_id,
    date: item.date,
    score: item.score,
    id_norma: item.id_norma,
    url: item.url,
    title: item.title,
  }
  });
  return result;
  } catch (error) {
    console.error('Error querying legal documents:', error);
    throw error;
  }
}

const sentenceEmbedding = async (sentence: string) => {
  // Sanitize and trim input
  const cleanedSentence = sentence.trim();
  
  // Handle empty or invalid input
  if (!cleanedSentence) {
      throw new Error('Empty search query');
  }

  try {
      const embedding = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: cleanedSentence,
          encoding_format: 'float', // Explicitly specify the format
      });

      // Verify we have a valid embedding
      if (!embedding.data[0]?.embedding || !Array.isArray(embedding.data[0].embedding)) {
          throw new Error('Invalid embedding response');
      }

      return embedding.data[0].embedding;
  } catch (error) {
      console.error('Error generating embedding:', error);
      throw error;
  }
}

const querySentencias = async (query: string, startDate?: Date, endDate?: Date) => {
  try {
    const mongoClient: MongoClient = await client.connect();
    const db = mongoClient.db('datos');
    const collection = db.collection('fallos');

    const embedding = await sentenceEmbedding(query);

    const vector = embedding;
    const vector_penalty = 5;
    const full_text_penalty = 5;
    const dateFilter = (startDate || endDate) ? {
      "full_date": {
        ...(startDate ? { "$gte": startDate } : {}),
        ...(endDate ? { "$lte": endDate } : {}),
      }
    } : {};

    const pipeline = [
      {
        "$vectorSearch": {
          "index": "vector_index",
          "path": "embedding",
          "queryVector": vector,
          "numCandidates": 200,
          "limit": 50,
          "filter": dateFilter,
        },
      },
      {
        "$group": {
          "_id": null,
          "docs": { "$push": "$$ROOT" },
        },
      },
      {
        "$unwind": {
          "path": "$docs",
          "includeArrayIndex": "rank",
        },
      },
      {
        "$addFields": {
          "vs_score": {
            "$divide": [1.0, { "$add": ["$rank", vector_penalty] }],
          },
        },
      },
      {
        "$project": {
          "vs_score": 1,
          "_id": "$docs._id",
          "title": "$docs.title",
          "text": "$docs.text",
          "type": "$docs.type",
          "year": "$docs.year",
          "month": "$docs.month",
          "full_date": "$docs.full_date",
          "id_saij": "$docs.id_saij",
          "summary": "$docs.summary",
          "jurisdiction": "$docs.jurisdiction",
          "pdf_url": "$docs.pdf_url",
        },
      },
      {
        "$unionWith": {
          "coll": "fallos",
          "pipeline": [
            {
              '$search': {
                'compound': {
                  'must': [
                    ...(startDate || endDate ? [{
                      'range': {
                        'path': 'full_date',
                        'gte': startDate || new Date("0001-01-01T00:00:00.000Z"),
                        'lte': endDate || new Date(),
                      }
                    }] : []),
                  ],
                  'should': [
                    {
                      'text': {
                        'query': query, 
                        'path': {
                          'wildcard': '*'
                        }
                      }
                    }
                  ]
                }
              }
            },
             {
              "$match": dateFilter
            },
            {
              "$limit": 50,
            },
            {
              "$group": {
                "_id": null,
                "docs": { "$push": "$$ROOT" },
              },
            },
            {
              "$unwind": {
                "path": "$docs",
                "includeArrayIndex": "rank",
              },
            },
            {
              "$addFields": {
                "fts_score": {
                  "$divide": [
                    1.0,
                    { "$add": ["$rank", full_text_penalty, 1] },
                  ],
                },
              },
            },
            {
              "$project": {
                "fts_score": 1,
                "_id": "$docs._id",
                "title": "$docs.title",
                "text": "$docs.text",
                "type": "$docs.type",
                "year": "$docs.year",
                "month": "$docs.month",
                "full_date": "$docs.full_date",
                "id_saij": "$docs.id_saij",
                "summary": "$docs.summary",
                "jurisdiction": "$docs.jurisdiction",
                "pdf_url": "$docs.pdf_url",
              },
            },
          ],
        },
      },
      {
        "$group": {
          "_id": "$_id",
          "vs_score": { "$max": "$vs_score" },
          "fts_score": { "$max": "$fts_score" },
          "title": { "$first": "$title" },
          "text": { "$first": "$text" },
          "type": { "$first": "$type" },
          "year": { "$first": "$year" },
          "month": { "$first": "$month" },
          "full_date": { "$first": "$full_date" },
          "id_saij": { "$first": "$id_saij" },
          "summary": { "$first": "$summary" },
          "jurisdiction": { "$first": "$jurisdiction" },
          "pdf_url": { "$first": "$pdf_url" },
        },
      },
      {
        "$project": {
          "_id": 1,
          "title": 1,
          "text": 1,
          "type": 1,
          "year": 1,
          "month": 1,
          "full_date": 1,
          "id_saij": 1,
          "summary": 1,
          "jurisdiction": 1,
          "pdf_url": 1,
          "vs_score": { "$ifNull": ["$vs_score", 0] },
          "fts_score": { "$ifNull": ["$fts_score", 0] },
        },
      },
      {
        "$project": {
          "score": {
            "$add": ["$fts_score", "$vs_score"]
          },
          "_id": 1,
          "title": 1,
          "text": 1,
          "type": 1,
          "year": 1,
          "month": 1,
          "full_date": 1,
          "id_saij": 1,
          "summary": 1,
          "jurisdiction": 1,
          "pdf_url": 1,
          "vs_score": 1,
          "fts_score": 1,
        },
      },
      {
        "$match": {
          "score": { "$gte": 0.1 }
        }
      },
      {
        "$sort": { "full_date": -1, "score": -1 }, // Prioritize more recent dates
      },
      {
        "$limit": 50,
      },
    ];

    const results = await collection.aggregate(pipeline).toArray();
    return results;
  } catch (error) {
    console.error('Error querying legal documents:', error);
    throw error;
  }
}

export const documentSearch = tool({
  description: 'Realiza una búsqueda semántica híbrida en todas las fuentes de datos disponibles (normativas legales, sentencias y documentos personales). Por defecto busca en todas las fuentes, pero permite filtrar por tipo de documento si el contexto o el usuario lo requiere específicamente. Utiliza búsqueda híbrida y reranking automático de los mejores resultados.',
  parameters: z.object({
    query: z.string().describe('The search query to find relevant legal documents'),
    filters: z.object({
      categories: z.array(NormativaCategory).optional().describe('Filter by normativa categories'),
      startDate: z.string().optional().describe('Start date filter in YYYY-MM-DD format'),
      endDate: z.string().optional().describe('End date filter in YYYY-MM-DD format'),
      jurisdiction: z.string().optional().describe('Filter by jurisdiction'),
      provincia: provincias.optional().describe('Filtra por provincia. Esto es para normativas'),
      documentTypes: z.array(DocumentType).optional().describe('Tipos de documentos a incluir. Por defecto incluye todos. Solo filtrar si el usuario lo solicita específicamente o el contexto lo requiere.'),
      maxResults: z.number().optional().describe('Maximum number of results to return')
    }).optional()
  }),
  execute: async ({ query, filters }): Promise<SearchResults> => {
    try {
      // Convert date strings to Date objects if provided
      

      const startDate = filters?.startDate ? new Date(filters.startDate) : undefined;
      const endDate = filters?.endDate ? new Date(filters.endDate) : undefined;

      // Initialize search promises based on documentTypes filter
      const searchPromises = [];
      const searchTypes: ('sentencias' | 'normativas' | 'personales')[] = []; 
      const documentTypes = filters?.documentTypes || ['normativas', 'sentencias', 'personales'];

      let provinciaForNormativas = filters?.provincia; 
      let addNormativaRestrictionMessage = false; 

      if (documentTypes.includes('sentencias')) {
        searchPromises.push(querySentencias(query, startDate, endDate));
        searchTypes.push('sentencias');
      }
      
      if (documentTypes.includes('normativas')) {
        // Check subscription status for provincial search

        searchPromises.push(queryLegal(query, filters?.categories, provinciaForNormativas, startDate, endDate));
        searchTypes.push('normativas');
      }
      

      // Execute all searches in parallel
      const results = await Promise.all(searchPromises);
      
      // Map results to their corresponding categories using the tracked types
      const searchResults: {
          sentencias: any[];
          normativas: any[];
          documentos: any[];
      } = {
          sentencias: [],
          normativas: [],
          documentos: []
      };

      // Assign results to correct categories based on tracked types
      results.forEach((result, index) => {
          const type = searchTypes[index];
          switch (type) {
              case 'sentencias':
                  searchResults.sentencias = result;
                  break;
              case 'normativas':
                  searchResults.normativas = result;
                  break;
              case 'personales':
                  searchResults.documentos = result;
                  break;
          }
      });

      const { sentencias, normativas, documentos } = searchResults;

      // Convert MongoDB documents to plain objects and standardize structure
      const plainSentencias = sentencias.map(s => ({
        title: s.title || '',
        text: s.text || '',
        type: 'sentencia' as const,
        date: s.full_date?.toISOString() || '',
        jurisdiction: s.jurisdiction || '',
        url: s.pdf_url || '',
        id_saij: s.id_saij || '',
      }));

      const plainNormativas = normativas.map(n => ({
        title: n.title || '',
        text: n.text || '',
        type: 'normativa' as const,
        category: n.category || '',
        number: n.number || '',
        date: n.date ? (n.date instanceof Date ? n.date.toISOString() : n.date) : '',
        documentId: n.documentId || '',
        id_norma: n.documentId?.toString() || '',
        url: n.url || '',
      }));



      // Apply maxResults filter if specified
      const maxResults = filters?.maxResults || 20;
      const limitResults = (results: SearchResult[]) => results.slice(0, maxResults);

      // Prepare results object with plain objects
      const searchResultsObject = {
        sentencias: limitResults(plainSentencias),
        normativas: limitResults(plainNormativas),
      };

      // Always apply reranking with fixed parameters
      const allDocs: SearchResult[] = [
        ...searchResultsObject.sentencias,
        ...searchResultsObject.normativas,
      ];

      if (allDocs.length > 0) {
        try {
          const reranked = await cohere.rerank({
            model: 'rerank-v3.5',
            query: query,
            documents: allDocs.map(doc => ({
              text: doc.text,
            })),
            topN: 50
          });

          // Reconstruct results based on reranking
          const rerankedResults: SearchResults = {
            sentencias: [],
            normativas: [],
            filters: filters
          };

          reranked.results.forEach(result => {
            const originalDoc = allDocs[result.index];
            if (originalDoc) {
              const docWithScore = {
                ...originalDoc,
                relevanceScore: result.relevanceScore
              };
              
              switch (originalDoc.type) {
                case 'sentencia':
                  rerankedResults.sentencias.push(docWithScore);
                  break;
                case 'normativa':
                  rerankedResults.normativas.push(docWithScore);
                  break;
              }
            }
          });

          // Add a guiding message
          const totalResults = rerankedResults.sentencias.length + rerankedResults.normativas.length;
          let message = `Se encontraron ${totalResults} resultados relevantes para "${query}". `;
          
          if (rerankedResults.sentencias.length > 0) {
            message += `Incluye ${rerankedResults.sentencias.length} sentencias judiciales (prioriza estas si el usuario busca precedentes legales). `;
          }
          if (rerankedResults.normativas.length > 0) {
            message += `Incluye ${rerankedResults.normativas.length} normativas (útiles para análisis normativo o regulatorio). `;
          }
          message += `Por favor, utiliza estos resultados para responder de forma precisa y contextualizada. Revisa siempre el field number para saber el numero de la normativa
          Recuerda usar jurisdiccion == provincia para generar las url de citacion`;

          rerankedResults.message = message;

          // Append informational message if provincial search was restricted
          if (addNormativaRestrictionMessage) {
            const infoMsg: InfoMessage = {
              type: 'documento',
              id: `info-${Date.now()}`,
              isInfoMessage: true,
              content: 'Su plan actual no incluye búsqueda por provincia para normativas. Mostrando resultados nacionales.',
              text: 'Su plan actual no incluye búsqueda por provincia para normativas. Mostrando resultados nacionales.', 
              // Add placeholder fields to match Normativa structure if needed for consistent UI rendering
              // title: "Información", 
              // organismo: "Sistema",
              // numero_normativa: "N/A",
              // fecha_sancion: new Date().toISOString().split('T')[0],
            };
            // Ensure normativas is an array before pushing
            if (!Array.isArray(rerankedResults.normativas)) {
              rerankedResults.normativas = [];
            }
            rerankedResults.normativas.push(infoMsg);
          }

          return { ...rerankedResults, filters };
        } catch (error) {
          console.error('Error during reranking:', error);
          return { ...searchResultsObject, filters }; 
        }
      }

      // Append informational message if provincial search was restricted
      // This block handles the case where reranking is skipped
      if (addNormativaRestrictionMessage) {
        const infoMsg: InfoMessage = {
          type: 'documento',
          id: `info-${Date.now()}`,
          isInfoMessage: true,
          content: 'Su plan actual no incluye búsqueda por provincia para normativas. Mostrando resultados nacionales. Debes mencionarle esto al usuario',
          text: 'Su plan actual no incluye búsqueda por provincia para normativas. Mostrando resultados nacionales. Debes mencionarle esto al usuario', 
          // Add placeholder fields to match Normativa structure if needed for consistent UI rendering
          // title: "Información", 
          // organismo: "Sistema",
          // numero_normativa: "N/A",
          // fecha_sancion: new Date().toISOString().split('T')[0],
        };
        if (!Array.isArray(searchResultsObject.normativas)) {
          searchResultsObject.normativas = [];
        }
        searchResultsObject.normativas.push(infoMsg);
      }

      return { ...searchResultsObject, filters };
    } catch (error) {
      console.error('Error in performSearch:', error);
      throw new Error('Error performing search');
    }
  }
}); 