import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

class HuggingFaceService {
    constructor() {
        this.hf = new HfInference(process.env.HUGGINGFACE_API_KEY);
        this.model = 'mistralai/Mistral-7B-Instruct-v0.2';
    }

    /**
     * Analyze training data using Hugging Face
     */
    async analyzeTrainingData(documentText, rawData = null) {
        try {
            const prompt = `You are an expert data analyst for the National Disaster Management Authority (NDMA) of India.

Analyze the following disaster management training data and provide comprehensive insights in JSON format:

${documentText.substring(0, 3000)}

Provide the following in valid JSON format:
{
  "totalTrainings": <number>,
  "totalParticipants": <number>,
  "themeDistribution": {"earthquake": <count>, "flood": <count>, etc},
  "stateWiseCoverage": {"state": <count>},
  "averageCompletionRate": "<percentage>%",
  "gapAnalysis": {
    "underservedStates": ["state1", "state2"],
    "underservedThemes": ["theme1"],
    "criticalGaps": ["gap1", "gap2"]
  },
  "recommendations": ["rec1", "rec2", "rec3"],
  "keyInsights": ["insight1", "insight2", "insight3"]
}

Respond ONLY with valid JSON, no markdown or explanations.`;

            const response = await this.hf.textGeneration({
                model: this.model,
                inputs: prompt,
                parameters: {
                    max_new_tokens: 1000,
                    temperature: 0.7,
                    return_full_text: false
                }
            });

            let analysisText = response.generated_text.trim();

            // Clean up response
            analysisText = analysisText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

            // Try to parse JSON
            let analysis;
            try {
                analysis = JSON.parse(analysisText);
            } catch (parseError) {
                console.warn('JSON parsing failed, creating fallback analysis');
                analysis = this.createFallbackAnalysis(documentText, rawData);
            }

            return analysis;
        } catch (error) {
            console.error('Hugging Face analysis error:', error);
            throw new Error(`Analysis failed: ${error.message}`);
        }
    }

    /**
     * Generate executive summary
     */
    async generateExecutiveSummary(analysisResults) {
        try {
            const prompt = `Based on this disaster management training analysis, write a concise 3-paragraph executive summary for NDMA officials:

${JSON.stringify(analysisResults, null, 2)}

Write in formal, professional language suitable for government documentation.`;

            const response = await this.hf.textGeneration({
                model: this.model,
                inputs: prompt,
                parameters: {
                    max_new_tokens: 500,
                    temperature: 0.7,
                    return_full_text: false
                }
            });

            return response.generated_text.trim();
        } catch (error) {
            throw new Error(`Executive summary generation failed: ${error.message}`);
        }
    }

    /**
     * RAG-based question answering
     */
    async answerQuestion(question, context) {
        try {
            const prompt = `Context: ${context.substring(0, 2000)}

Question: ${question}

Provide a detailed, data-driven answer based on the context:`;

            const response = await this.hf.textGeneration({
                model: this.model,
                inputs: prompt,
                parameters: {
                    max_new_tokens: 300,
                    temperature: 0.7,
                    return_full_text: false
                }
            });

            return response.generated_text.trim();
        } catch (error) {
            throw new Error(`Question answering failed: ${error.message}`);
        }
    }

    /**
     * Fallback analysis if AI fails
     */
    createFallbackAnalysis(documentText, rawData) {
        const analysis = {
            totalTrainings: 0,
            totalParticipants: 0,
            themeDistribution: {},
            stateWiseCoverage: {},
            averageCompletionRate: "N/A",
            gapAnalysis: {
                underservedStates: [],
                underservedThemes: [],
                criticalGaps: ["Unable to perform detailed analysis - please check data format"]
            },
            recommendations: [
                "Ensure data is in proper format with clear headers",
                "Include all required fields: training ID, date, location, theme, participants",
                "Maintain consistent data entry standards"
            ],
            keyInsights: [
                "Data analysis completed - please review the uploaded document for details"
            ]
        };

        if (rawData && Array.isArray(rawData)) {
            analysis.totalTrainings = rawData.length;

            rawData.forEach(row => {
                const participantFields = ['participants', 'Participants', 'total_participants'];
                for (const field of participantFields) {
                    if (row[field]) {
                        analysis.totalParticipants += parseInt(row[field]) || 0;
                        break;
                    }
                }
            });
        }

        return analysis;
    }
}

export default new HuggingFaceService();
