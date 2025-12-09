import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

class RAGEngine {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Using Gemini Pro with correct model path format
        this.model = this.genAI.getGenerativeModel({ model: 'models/gemini-pro' });
    }

    /**
     * Split text into chunks for processing
     */
    chunkText(text, chunkSize = 2000, overlap = 200) {
        const chunks = [];
        let start = 0;

        while (start < text.length) {
            const end = Math.min(start + chunkSize, text.length);
            chunks.push(text.slice(start, end));
            start = end - overlap;
        }

        return chunks;
    }

    /**
     * Generate embeddings for text (simplified version)
     * In production, use proper embedding models
     */
    async generateEmbedding(text) {
        // For now, we'll use the text directly
        // In production, implement proper vector embeddings
        return text;
    }

    /**
     * Perform semantic search on chunks
     */
    async semanticSearch(query, chunks) {
        // Simplified semantic search
        // In production, use vector similarity search
        return chunks.filter(chunk =>
            chunk.toLowerCase().includes(query.toLowerCase())
        );
    }

    /**
     * Generate response using RAG approach
     */
    async generateResponse(query, context) {
        try {
            const prompt = `
You are an AI assistant analyzing disaster management training data for the Government of India (NDMA).

Context from uploaded documents:
${context}

Query: ${query}

Please provide a detailed, data-driven response based on the context provided. Include specific numbers, statistics, and insights where available.
`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            throw new Error(`RAG generation failed: ${error.message}`);
        }
    }

    /**
     * Main RAG query method
     */
    async query(question, documentText) {
        try {
            // Split document into chunks
            const chunks = this.chunkText(documentText);

            // Find relevant chunks (simplified semantic search)
            const relevantChunks = await this.semanticSearch(question, chunks);

            // Combine relevant chunks as context
            const context = relevantChunks.slice(0, 3).join('\n\n');

            // Generate response
            const response = await this.generateResponse(question, context);

            return response;
        } catch (error) {
            throw new Error(`RAG query failed: ${error.message}`);
        }
    }
}

export default new RAGEngine();
