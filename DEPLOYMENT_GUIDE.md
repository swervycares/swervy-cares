# 🚀 Swervy Cares - GitHub Pages Deployment Guide

## Overview
Complete deployment instructions for your AI-enhanced Swervy Cares website with beautiful pink-purple-blue aura effects.

## 📋 Prerequisites
- GitHub account
- OpenAI API key (for AI chat functionality)
- Basic knowledge of GitHub

## 🔧 Setup Instructions

### Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository" (green button)
3. Name it: `swervy-cares-website`
4. Set to **Public** (required for GitHub Pages)
5. Check "Add a README file"
6. Click "Create repository"

### Step 2: Upload Your Code
1. Download all project files from Replit
2. In your new GitHub repository, click "uploading an existing file"
3. Drag and drop all your project files
4. Commit with message: "Initial website upload"

### Step 3: Configure GitHub Pages
1. In your repository, go to **Settings** tab
2. Scroll down to **Pages** section (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Choose branch: **main**
5. Choose folder: **/ (root)**
6. Click **Save**

### Step 4: Add Environment Variables (Secrets)
1. In your repository, go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `VITE_OPENAI_API_KEY`: Your OpenAI API key (for frontend)

### Step 5: Create GitHub Actions Workflow
Create `.github/workflows/deploy.yml` with this content:

```yaml
name: Deploy Swervy Cares

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build project
      env:
        VITE_OPENAI_API_KEY: ${{ secrets.VITE_OPENAI_API_KEY }}
      run: npm run build
      
    - name: Fix static deployment structure
      run: node build-for-static-deployment.js
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

## 🌐 Access Your Website
After deployment (takes 5-10 minutes):
- Your website will be available at: `https://[your-username].github.io/swervy-cares-website`
- Example: `https://johndoe.github.io/swervy-cares-website`

## 🔑 Getting OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. Add it to GitHub secrets as shown above

## 📱 Features Included
✅ Beautiful pink-purple-blue aura backgrounds
✅ AI-powered chat for kit recommendations  
✅ Separate pages: Home, Mission, Volunteer, Donate, Share
✅ PayPal donation integration
✅ Google Sheets backend for forms
✅ Mobile-responsive design
✅ Fast loading animations

## 🛠️ Customization
- Colors: Edit `client/src/index.css` for theme changes
- Content: Update pages in `client/src/pages/`
- Forms: Modify Google Sheets URLs in components
- AI prompts: Edit `server/services/openai.ts`

## 📞 Support
If you need help:
1. Check GitHub Actions tab for build errors
2. Verify all secrets are added correctly
3. Ensure OpenAI API key has credits
4. Contact GitHub support for Pages issues

## 🎉 Success!
Your website should now be live with:
- Magical pink-purple-blue aura effects
- Working AI chat assistant
- All original functionality preserved
- Professional responsive design

Happy deploying! 🌟