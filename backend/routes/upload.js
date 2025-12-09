import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import Document from '../models/Document.js';
import documentParser from '../services/documentParser.js';
import analysisService from '../services/analysisService.js';
import reportGenerator from '../services/reportGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'application/pdf',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/csv'
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF, Excel, and CSV files are allowed.'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
});

/**
 * POST /api/upload
 * Upload and analyze document
 */
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('📄 File uploaded:', req.file.originalname);

        // Determine file type
        let fileType = 'pdf';
        if (req.file.mimetype.includes('excel') || req.file.mimetype.includes('spreadsheet')) {
            fileType = 'excel';
        } else if (req.file.mimetype.includes('csv')) {
            fileType = 'csv';
        }

        let documentId = null;

        // Try to save to database (optional - won't fail if MongoDB not connected)
        try {
            const document = new Document({
                filename: req.file.filename,
                originalName: req.file.originalname,
                fileType,
                fileSize: req.file.size,
                status: 'processing'
            });
            const savedDoc = await Promise.race([
                document.save(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('DB timeout')), 2000))
            ]);
            documentId = savedDoc._id;
            console.log('✅ Saved to database');
        } catch (dbError) {
            console.warn('⚠️  Database not available, continuing without saving...');
        }

        // Parse document
        console.log('🔍 Parsing document...');
        const parseResult = await documentParser.parseDocument(req.file.path, fileType);

        // Analyze document
        console.log('🤖 Analyzing with AI...');
        const analysisResults = await analysisService.analyzeTrainingData(
            parseResult.text,
            parseResult.data
        );

        // Generate executive summary
        console.log('📝 Generating executive summary...');
        const executiveSummary = await analysisService.generateExecutiveSummary(analysisResults);

        // Generate PDF report
        console.log('📄 Generating PDF report...');
        const reportInfo = await reportGenerator.generateReport(
            analysisResults,
            {
                originalName: req.file.originalname,
                uploadDate: new Date()
            },
            executiveSummary
        );

        console.log('✅ Analysis complete!');

        res.json({
            success: true,
            message: 'Document analyzed successfully',
            documentId: documentId || 'temp-' + Date.now(),
            analysis: analysisResults,
            executiveSummary,
            reportUrl: reportInfo.url,
            reportFilename: reportInfo.filename
        });

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({
            error: 'Failed to process document',
            message: error.message
        });
    }
});

/**
 * GET /api/upload/documents
 * Get all uploaded documents
 */
router.get('/documents', async (req, res) => {
    try {
        const documents = await Document.find()
            .sort({ uploadDate: -1 })
            .select('-extractedText')
            .limit(50);

        res.json({
            success: true,
            documents
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch documents',
            message: error.message
        });
    }
});

/**
 * GET /api/upload/document/:id
 * Get specific document details
 */
router.get('/document/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        res.json({
            success: true,
            document
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to fetch document',
            message: error.message
        });
    }
});

/**
 * DELETE /api/upload/document/:id
 * Delete a document
 */
router.delete('/document/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        // Delete file from filesystem
        const filePath = path.join(__dirname, '../uploads', document.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await Document.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete document',
            message: error.message
        });
    }
});

export default router;
