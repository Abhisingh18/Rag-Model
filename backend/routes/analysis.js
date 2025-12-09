import express from 'express';
import Document from '../models/Document.js';
import analysisService from '../services/analysisService.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

/**
 * POST /api/analysis/ask
 * Ask a question about uploaded document using RAG
 */
router.post('/ask', async (req, res) => {
    try {
        const { documentId, question } = req.body;

        if (!documentId || !question) {
            return res.status(400).json({
                error: 'Document ID and question are required'
            });
        }

        const document = await Document.findById(documentId);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        if (!document.extractedText) {
            return res.status(400).json({
                error: 'Document has not been processed yet'
            });
        }

        const answer = await analysisService.askQuestion(
            question,
            document.extractedText
        );

        res.json({
            success: true,
            question,
            answer
        });

    } catch (error) {
        console.error('Question answering error:', error);
        res.status(500).json({
            error: 'Failed to answer question',
            message: error.message
        });
    }
});

/**
 * GET /api/analysis/report/:filename
 * Download generated report
 */
router.get('/report/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filepath = path.join(__dirname, '../reports', filename);

        if (!fs.existsSync(filepath)) {
            return res.status(404).json({ error: 'Report not found' });
        }

        res.download(filepath, filename);
    } catch (error) {
        res.status(500).json({
            error: 'Failed to download report',
            message: error.message
        });
    }
});

/**
 * GET /api/analysis/stats
 * Get overall statistics
 */
router.get('/stats', async (req, res) => {
    try {
        const totalDocuments = await Document.countDocuments();
        const analyzedDocuments = await Document.countDocuments({ status: 'analyzed' });

        // Aggregate statistics from all analyzed documents
        const documents = await Document.find({ status: 'analyzed' });

        let totalTrainings = 0;
        let totalParticipants = 0;
        const allThemes = {};
        const allStates = {};

        documents.forEach(doc => {
            if (doc.analysisResults) {
                totalTrainings += doc.analysisResults.totalTrainings || 0;
                totalParticipants += doc.analysisResults.totalParticipants || 0;

                if (doc.analysisResults.themeDistribution) {
                    Object.entries(doc.analysisResults.themeDistribution).forEach(([theme, count]) => {
                        allThemes[theme] = (allThemes[theme] || 0) + count;
                    });
                }

                if (doc.analysisResults.stateWiseCoverage) {
                    Object.entries(doc.analysisResults.stateWiseCoverage).forEach(([state, count]) => {
                        allStates[state] = (allStates[state] || 0) + count;
                    });
                }
            }
        });

        res.json({
            success: true,
            stats: {
                totalDocuments,
                analyzedDocuments,
                totalTrainings,
                totalParticipants,
                themeDistribution: allThemes,
                stateWiseCoverage: allStates
            }
        });

    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch statistics',
            message: error.message
        });
    }
});

export default router;
