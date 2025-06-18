import { CohereClient } from "cohere-ai";

export interface CohereRerankResult {
  index: number;
  relevance_score: number;
  document: {
    text: string;
    id: string;
  };
}

export interface CohereRerankResponse {
  results: CohereRerankResult[];
}

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY || '',
});

export default cohere; 