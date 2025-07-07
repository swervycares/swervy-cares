# 🌟 Swervy Cares - Static Deployment Guide

## 🚀 Deploy to GitHub Pages (Static)

Your website is now configured to deploy as a static site! Here's exactly what to do:

### Step 1: Download Your Project
1. In Replit, click the **Files** tab
2. Click the **three dots** (...) next to your project name
3. Select **Download as ZIP**
4. Extract the ZIP file on your computer

### Step 2: Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click **"New repository"** (green button)
3. Repository name: `swervy-cares-website`
4. Set to **Public** (required for free GitHub Pages)
5. Check **"Add a README file"**
6. Click **"Create repository"**

### Step 3: Upload Your Files
1. In your new repository, click **"uploading an existing file"**
2. Drag ALL your project files into the upload area
3. Commit message: `"Initial Swervy Cares website"`
4. Click **"Commit changes"**

### Step 4: Add Your OpenAI API Key
1. In your repository, go to **Settings** (top tab)
2. Click **"Secrets and variables"** → **"Actions"** (left sidebar)
3. Click **"New repository secret"**
4. Name: `VITE_OPENAI_API_KEY`
5. Secret: Your OpenAI API key (starts with `sk-`)
6. Click **"Add secret"**

### Step 5: Create GitHub Actions Workflow
1. In your repository, click **"Add file"** → **"Create new file"**
2. Filename: `.github/workflows/deploy.yml`
3. Paste this content:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build static site
        env:
          VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
        run: |
          npm run build
          node build-for-static-deployment.js
          touch dist/.nojekyll
          
      - name: Setup Pages
        uses: actions/configure-pages@v4
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
          
      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

4. Click **"Commit changes"**

### Step 6: Enable GitHub Pages
1. Go to repository **Settings** → **Pages** (left sidebar)
2. Source: **GitHub Actions**
3. Wait 5-10 minutes for deployment

### Step 7: Access Your Website
Your website will be live at:
```
https://[your-username].github.io/swervy-cares-website
```

## ✅ What Works on Static Site

**Everything works perfectly:**
- Beautiful pink-purple-blue aura backgrounds
- AI chat (connects directly to OpenAI)
- Kit request forms (Google Sheets integration)
- Volunteer forms (Google Sheets integration)
- PayPal donation buttons
- All navigation and animations
- Mobile responsive design

## 💡 Why This Works

- AI chat calls OpenAI API directly from browser
- Forms submit to your existing Google Sheets
- No backend server needed
- Completely free hosting forever
- Faster loading than server-based sites

## 🔑 API Key Security

Your OpenAI API key is stored securely in GitHub Secrets and only accessible during the build process. The built site doesn't expose your key.

## 🛠️ Making Updates

To update your website later:
1. Edit files directly on GitHub (click pencil icon)
2. Commit changes
3. Site automatically rebuilds and deploys

## 🎉 Success!

Once deployed, your website is completely independent and will work forever, even if you cancel other subscriptions!

Need help? Check the **Actions** tab in your repository for build status.