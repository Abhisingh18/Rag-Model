import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import uploadRoutes from './routes/upload.js';
import analysisRoutes from './routes/analysis.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rag-document-analysis')
    .then(() => console.log('✅ MongoDB connected successfully'))
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/analysis', analysisRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'RAG Document Analysis API is running',
        timestamp: new Date().toISOString()
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
});
