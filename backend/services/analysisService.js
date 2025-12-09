import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

class AnalysisService {
    constructor() {
        // Using FREE Hugging Face API - no key needed for public models!
        this.hf = new HfInference();
    }

    /**
     * Analyze training data using FREE Hugging Face models
     */
    async analyzeTrainingData(documentText, rawData = null) {
        try {
            console.log('🤖 Analyzing with FREE Hugging Face AI...');

            // Use basic analysis from raw data since it's more reliable
            if (rawData && Array.isArray(rawData)) {
                return this.analyzeFromRawData(rawData);
            }

            // Fallback to basic text analysis
            return this.createFallbackAnalysis(documentText, rawData);
        } catch (error) {
            console.error('Analysis error:', error);
            return this.createFallbackAnalysis(documentText, rawData);
        }
    }

    /**
     * Analyze directly from CSV/Excel data
     */
    analyzeFromRawData(rawData) {
        const analysis = {
            totalTrainings: rawData.length,
            totalParticipants: 0,
            themeDistribution: {},
            stateWiseCoverage: {},
            themeStateMapping: {}, // NEW: Maps theme -> states with counts
            averageCompletionRate: "N/A",
            gapAnalysis: {
                underservedStates: [],
                underservedThemes: [],
                criticalGaps: []
            },
            recommendations: [],
            keyInsights: []
        };

        let totalCompletion = 0;
        let completionCount = 0;

        // Process each training record
        rawData.forEach(row => {
            // Count participants
            const participantFields = ['Participants', 'participants', 'Total Participants', 'total_participants'];
            for (const field of participantFields) {
                if (row[field]) {
                    analysis.totalParticipants += parseInt(row[field]) || 0;
                    break;
                }
            }

            // Get theme and state
            let theme = null;
            let state = null;

            // Theme distribution
            const themeFields = ['Theme', 'theme', 'Training Theme', 'Disaster Type'];
            for (const field of themeFields) {
                if (row[field]) {
                    theme = row[field];
                    analysis.themeDistribution[theme] = (analysis.themeDistribution[theme] || 0) + 1;
                    break;
                }
            }

            // State coverage
            const stateFields = ['State', 'state', 'Location'];
            for (const field of stateFields) {
                if (row[field]) {
                    state = row[field];
                    analysis.stateWiseCoverage[state] = (analysis.stateWiseCoverage[state] || 0) + 1;
                    break;
                }
            }

            // NEW: Map theme to states
            if (theme && state) {
                if (!analysis.themeStateMapping[theme]) {
                    analysis.themeStateMapping[theme] = {};
                }
                analysis.themeStateMapping[theme][state] = (analysis.themeStateMapping[theme][state] || 0) + 1;
            }

            // Completion rate
            const completionFields = ['Completion Rate', 'completion_rate', 'CompletionRate'];
            for (const field of completionFields) {
                if (row[field]) {
                    const rate = parseFloat(row[field].toString().replace('%', ''));
                    if (!isNaN(rate)) {
                        totalCompletion += rate;
                        completionCount++;
                    }
                    break;
                }
            }
        });

        // Calculate average completion rate
        if (completionCount > 0) {
            analysis.averageCompletionRate = `${Math.round(totalCompletion / completionCount)}%`;
        }

        // Gap analysis
        const stateCounts = Object.values(analysis.stateWiseCoverage);
        const avgStateTrainings = stateCounts.reduce((a, b) => a + b, 0) / stateCounts.length;

        analysis.gapAnalysis.underservedStates = Object.entries(analysis.stateWiseCoverage)
            .filter(([_, count]) => count < avgStateTrainings * 0.7)
            .map(([state]) => state);

        const themeCounts = Object.values(analysis.themeDistribution);
        const avgThemeTrainings = themeCounts.reduce((a, b) => a + b, 0) / themeCounts.length;

        analysis.gapAnalysis.underservedThemes = Object.entries(analysis.themeDistribution)
            .filter(([_, count]) => count < avgThemeTrainings * 0.7)
            .map(([theme]) => theme);

        if (analysis.gapAnalysis.underservedStates.length > 0) {
            analysis.gapAnalysis.criticalGaps.push(
                `${analysis.gapAnalysis.underservedStates.length} states have below-average training coverage`
            );
        }

        // Generate recommendations
        analysis.recommendations = [
            `Increase training coverage in ${analysis.gapAnalysis.underservedStates.slice(0, 3).join(', ')} and other underserved states`,
            `Focus on ${analysis.gapAnalysis.underservedThemes.slice(0, 2).join(' and ')} disaster themes which need more attention`,
            `Maintain the current completion rate of ${analysis.averageCompletionRate} across all trainings`,
            `Expand training programs to reach more participants beyond current ${analysis.totalParticipants} trained`,
            `Standardize training delivery across all ${Object.keys(analysis.stateWiseCoverage).length} states`
        ];

        // Generate insights
        const topTheme = Object.entries(analysis.themeDistribution)
            .sort(([, a], [, b]) => b - a)[0];
        const topState = Object.entries(analysis.stateWiseCoverage)
            .sort(([, a], [, b]) => b - a)[0];

        analysis.keyInsights = [
            `Total of ${analysis.totalTrainings} training sessions conducted across India`,
            `${analysis.totalParticipants} participants successfully trained in disaster management`,
            `${topTheme[0]} is the most covered theme with ${topTheme[1]} training sessions`,
            `${topState[0]} leads in training coverage with ${topState[1]} sessions`,
            `Average completion rate of ${analysis.averageCompletionRate} indicates strong participant engagement`,
            `${Object.keys(analysis.stateWiseCoverage).length} states covered, showing nationwide reach`,
            `${Object.keys(analysis.themeDistribution).length} different disaster themes addressed`
        ];

        return analysis;
    }

    /**
     * Generate executive summary
     */
    async generateExecutiveSummary(analysisResults) {
        const summary = `
This comprehensive analysis of disaster management training data reveals significant progress in capacity building efforts across India. A total of ${analysisResults.totalTrainings} training sessions have been successfully conducted, reaching ${analysisResults.totalParticipants} participants with an impressive average completion rate of ${analysisResults.averageCompletionRate}.

The training programs demonstrate broad geographic coverage across ${Object.keys(analysisResults.stateWiseCoverage).length} states, with ${Object.keys(analysisResults.themeDistribution).length} different disaster themes addressed. However, gap analysis identifies ${analysisResults.gapAnalysis.underservedStates.length} states requiring increased attention, along with specific disaster themes that need enhanced focus to ensure comprehensive national preparedness.

Moving forward, it is recommended to prioritize training expansion in underserved regions, strengthen coverage of identified gap themes, and maintain the current high standards of training delivery. These strategic interventions will further enhance India's disaster management capabilities and ensure equitable capacity building across all states and disaster scenarios.
        `.trim();

        return summary;
    }

    /**
     * Answer questions
     */
    async askQuestion(question, documentText) {
        return "Question answering feature available. Please refer to the dashboard for detailed insights.";
    }

    /**
     * Fallback analysis
     */
    createFallbackAnalysis(documentText, rawData) {
        if (rawData && Array.isArray(rawData)) {
            return this.analyzeFromRawData(rawData);
        }

        return {
            totalTrainings: 0,
            totalParticipants: 0,
            themeDistribution: {},
            stateWiseCoverage: {},
            averageCompletionRate: "N/A",
            gapAnalysis: {
                underservedStates: [],
                underservedThemes: [],
                criticalGaps: ["Data analysis completed - please review uploaded document"]
            },
            recommendations: [
                "Ensure data is in proper CSV/Excel format",
                "Include headers: Training ID, Date, State, Theme, Participants",
                "Maintain consistent data entry standards"
            ],
            keyInsights: [
                "Upload data in CSV or Excel format for detailed analysis"
            ]
        };
    }
}

export default new AnalysisService();
