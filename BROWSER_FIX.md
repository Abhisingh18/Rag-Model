# Quick Fix Guide

## Problem: Browser Not Loading

### Step 1: Open Browser Manually
1. Open Chrome/Edge
2. Type in address bar: `localhost:5173`
3. Press Enter

### Step 2: If Still Not Working
1. Clear browser cache: Ctrl + Shift + Delete
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh: Ctrl + F5

### Step 3: Check Console
1. Press F12 in browser
2. Go to Console tab
3. Look for any red errors
4. Share screenshot if errors appear

### Direct URL
```
http://localhost:5173
```

## Servers Status
✅ Backend: Running on port 5000
✅ Frontend: Running on port 5173

## If Nothing Works
Try this in PowerShell:
```powershell
cd "c:\Users\91979\OneDrive\Desktop\Rag Model\frontend"
npm run dev
```

Then open: http://localhost:5173
