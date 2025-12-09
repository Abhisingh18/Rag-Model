# Quick Setup Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Get Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### Step 3: Configure Environment

Edit `backend/.env`:
```env
GEMINI_API_KEY=paste_your_api_key_here
MONGODB_URI=mongodb://localhost:27017/rag-document-analysis
PORT=5000
CLIENT_URL=http://localhost:5173
```

### Step 4: Start MongoDB

**Option A: Local MongoDB**
```bash
mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Create free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get connection string
- Update `MONGODB_URI` in `.env`

### Step 5: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6: Test with Sample Data

1. Open browser: `http://localhost:5173`
2. Upload the `sample_training_data.csv` file
3. Wait for analysis (30-60 seconds)
4. View dashboard and download report

## 🎯 Testing Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB connected successfully
- [ ] Upload sample CSV file
- [ ] View analysis dashboard
- [ ] Download PDF report
- [ ] Check report format

## ⚠️ Common Issues

### Issue: "MongoDB connection failed"
**Solution:** Make sure MongoDB is running or use MongoDB Atlas

### Issue: "Gemini API error"
**Solution:** Check if API key is valid and has quota

### Issue: "Cannot upload file"
**Solution:** Check file size (max 10MB) and format (PDF/Excel/CSV)

### Issue: "Port already in use"
**Solution:** Change port in `.env` or kill existing process

## 📞 Need Help?

Check the main [README.md](README.md) for detailed documentation.

---

**Team JARVIS GGV | SIH 2025**
