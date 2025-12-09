# MongoDB Atlas Setup - Step by Step Guide

## 📋 Follow These Steps Exactly:

### Step 1: Create Account (2 minutes)
1. Open browser and go to: **https://www.mongodb.com/cloud/atlas/register**
2. Sign up with:
   - **Email** (recommended) OR
   - **Google account** (fastest)
3. Click "Create your Atlas account"

### Step 2: Create Free Cluster (3 minutes)
1. After login, you'll see "Create a deployment"
2. Choose **M0 FREE** tier (it's completely free!)
3. **Cloud Provider**: Select any (AWS recommended)
4. **Region**: Select closest to India (e.g., Mumbai, Singapore)
5. **Cluster Name**: Keep default or name it `rag-cluster`
6. Click **"Create Deployment"** button
7. Wait 1-3 minutes for cluster to be created

### Step 3: Create Database User (1 minute)
1. A popup will appear: "Security Quickstart"
2. **Username**: Enter `ragadmin` (or any name you want)
3. **Password**: Click "Autogenerate Secure Password" 
   - **IMPORTANT**: Copy this password and save it somewhere!
4. Click **"Create Database User"**

### Step 4: Add IP Address (1 minute)
1. Next screen: "Where would you like to connect from?"
2. Click **"Add My Current IP Address"** button
3. OR for testing, click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Finish and Close"**

### Step 5: Get Connection String (1 minute)
1. Click **"Go to Database"** or **"Connect"** button
2. Choose **"Drivers"** option
3. Select:
   - Driver: **Node.js**
   - Version: **5.5 or later**
4. Copy the connection string (looks like this):
   ```
   mongodb+srv://ragadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT**: Replace `<password>` with the actual password you saved earlier!

### Step 6: Give Me the Connection String
**Paste the complete connection string here** (with password replaced), and I'll add it to your `.env` file!

Example format:
```
mongodb+srv://ragadmin:YourActualPassword123@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

---

## 🎯 Quick Reference

**What you need to give me:**
- ✅ MongoDB Atlas connection string (with password)

**What I'll do:**
- ✅ Add it to `.env` file
- ✅ Test the connection
- ✅ Start the backend server
- ✅ Start the frontend
- ✅ Open the app in browser

---

## ⚠️ Common Issues

**Issue**: "Password contains special characters"
**Solution**: URL encode the password or regenerate a simpler one

**Issue**: "IP not whitelisted"
**Solution**: Add 0.0.0.0/0 in Network Access settings

**Issue**: "Connection timeout"
**Solution**: Check if cluster is active (green dot)

---

**Ready? Start with Step 1 and let me know when you have the connection string!** 🚀
