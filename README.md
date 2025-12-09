# RAG Document Analysis System

![NDMA Logo](https://img.shields.io/badge/NDMA-Government%20of%20India-blue)
![SIH 2025](https://img.shields.io/badge/SIH-2025-green)
![Team](https://img.shields.io/badge/Team-JARVIS%20GGV-purple)

A comprehensive RAG (Retrieval-Augmented Generation) based document analysis system for analyzing disaster management training data. Built for the National Disaster Management Authority (NDMA) as part of Smart India Hackathon 2025.

## 🌟 Features

- **📤 Multi-Format Upload**: Support for PDF, Excel (.xlsx, .xls), and CSV files
- **🤖 AI-Powered Analysis**: Uses Google Gemini AI for intelligent data analysis
- **📊 Interactive Dashboard**: Beautiful visualizations with charts and metrics
- **📄 Government Reports**: Auto-generate professional PDF reports in government format
- **🔍 RAG-based Q&A**: Ask questions about your uploaded documents
- **💾 Data Persistence**: MongoDB storage for analysis history
- **🎨 Modern UI**: Glassmorphism design with smooth animations

## 🏗️ Architecture

```
┌─────────────────┐
│  React Frontend │
│   (Vite + UI)   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Express API    │
│  (Node.js)      │
└────────┬────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│MongoDB │ │Gemini AI │
└────────┘ └──────────┘
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**
```bash
cd "c:\Users\91979\OneDrive\Desktop\Rag Model"
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Environment Variables**

Edit `backend/.env` and add your credentials:
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/rag-document-analysis
```

4. **Setup Frontend**
```bash
cd ../frontend
npm install
```

### Running the Application

1. **Start MongoDB** (if running locally)
```bash
mongod
```

2. **Start Backend Server**
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

3. **Start Frontend** (in a new terminal)
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

4. **Open in Browser**
Navigate to `http://localhost:5173`

## 📖 Usage Guide

### 1. Upload Training Data

- Click on the upload area or drag & drop your file
- Supported formats: PDF, Excel, CSV
- Maximum file size: 10MB
- Click "Upload & Analyze"

### 2. View Analysis Dashboard

- Automatic analysis using AI
- View key metrics (trainings, participants, completion rates)
- Interactive charts for theme and state distribution
- Gap analysis showing underserved areas
- Key insights and recommendations

### 3. Download Report

- Click on "Report" tab
- Preview the government-format report
- Download as PDF
- Share with stakeholders

## 📁 Project Structure

```
Rag Model/
├── backend/
│   ├── models/
│   │   └── Document.js          # MongoDB schema
│   ├── routes/
│   │   ├── upload.js            # Upload endpoints
│   │   └── analysis.js          # Analysis endpoints
│   ├── services/
│   │   ├── documentParser.js    # PDF/Excel/CSV parser
│   │   ├── ragEngine.js         # RAG implementation
│   │   ├── analysisService.js   # AI analysis logic
│   │   └── reportGenerator.js   # PDF report generation
│   ├── server.js                # Express server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileUpload.jsx   # Upload component
│   │   │   ├── AnalysisDashboard.jsx  # Dashboard
│   │   │   └── ReportPreview.jsx      # Report preview
│   │   ├── App.jsx              # Main app
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Styles
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

## 🔧 API Endpoints

### Upload & Analysis
- `POST /api/upload` - Upload and analyze document
- `GET /api/upload/documents` - Get all documents
- `GET /api/upload/document/:id` - Get specific document
- `DELETE /api/upload/document/:id` - Delete document

### Analysis & Reports
- `POST /api/analysis/ask` - Ask question about document (RAG)
- `GET /api/analysis/report/:filename` - Download report
- `GET /api/analysis/stats` - Get aggregate statistics

## 🎨 Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- Google Gemini AI
- PDFKit (report generation)
- Multer (file uploads)
- pdf-parse, xlsx, csv-parser

**Frontend:**
- React 18
- Vite
- Recharts (data visualization)
- React Dropzone
- Lucide React (icons)
- Axios

## 📊 Sample Data Format

### Excel/CSV Format
```csv
Training ID,Date,Location,State,Theme,Participants,Trainer,Duration,Completion Rate
TR001,2024-01-15,Delhi,Delhi,Earthquake,50,Dr. Sharma,2 days,95%
TR002,2024-01-20,Mumbai,Maharashtra,Flood,75,Mr. Patel,3 days,88%
```

### Analysis Output
```json
{
  "totalTrainings": 150,
  "totalParticipants": 5000,
  "themeDistribution": {
    "Earthquake": 40,
    "Flood": 60,
    "Cyclone": 30
  },
  "stateWiseCoverage": {
    "Delhi": 20,
    "Maharashtra": 35
  },
  "averageCompletionRate": "91%",
  "gapAnalysis": {
    "underservedStates": ["Nagaland", "Mizoram"],
    "underservedThemes": ["Tsunami"]
  },
  "recommendations": [...]
}
```

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | Yes |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `PORT` | Backend server port | No (default: 5000) |
| `CLIENT_URL` | Frontend URL for CORS | No (default: http://localhost:5173) |

## 🤝 Contributing

This project was developed for Smart India Hackathon 2025 by Team JARVIS GGV.

## 📝 License

MIT License - Feel free to use for educational and government purposes.

## 👥 Team JARVIS GGV

Smart India Hackathon 2025  
Problem Statement ID: SIH25258  
Theme: Disaster Management

---

**For Official Use by NDMA, Government of India**
