import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    originalName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ['pdf', 'excel', 'csv'],
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['uploaded', 'processing', 'analyzed', 'error'],
        default: 'uploaded'
    },
    extractedText: {
        type: String
    },
    analysisResults: {
        totalTrainings: Number,
        totalParticipants: Number,
        themeDistribution: mongoose.Schema.Types.Mixed,
        stateWiseCoverage: mongoose.Schema.Types.Mixed,
        averageCompletionRate: String,
        gapAnalysis: mongoose.Schema.Types.Mixed,
        recommendations: [String],
        keyInsights: [String]
    },
    reportUrl: {
        type: String
    },
    cloudinaryUrl: {
        type: String
    }
}, {
    timestamps: true
});

export default mongoose.model('Document', documentSchema);
