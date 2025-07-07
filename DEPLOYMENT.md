# GitHub Deployment Guide for Swervy Cares

## Quick Setup Steps

### 1. Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and create a new repository
2. Name it `swervy-cares` (or your preferred name)
3. Make it public (required for free GitHub Pages)
4. Don't initialize with README (we already have one)

### 2. Push Your Code
In your terminal, run these commands:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit your code
git commit -m "Initial commit: Swervy Cares website with AI chat"

# Connect to your GitHub repository (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/swervy-cares.git

# Push to GitHub
git push -u origin main
```

### 3. Set Up GitHub Secrets
1. Go to your repository on GitHub
2. Click Settings > Secrets and variables > Actions
3. Click "New repository secret"
4. Add these secrets:
   - **Name**: `VITE_OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with sk-)

### 4. Enable GitHub Pages
1. In your repository, go to Settings > Pages
2. Under "Source", select "Deploy from a branch"
3. Select "gh-pages" branch
4. Click "Save"

### 5. Trigger Deployment
1. Make any small change to your code (like updating README.md)
2. Commit and push:
```bash
git add .
git commit -m "Trigger deployment"
git push
```

3. Go to Actions tab in your GitHub repository to watch the deployment

### 6. Access Your Live Site
- Your site will be available at: `https://YOUR_USERNAME.github.io/swervy-cares`
- It may take 5-10 minutes for the first deployment

## Important Notes

- **OpenAI API Key**: The AI chat will only work if you've added the `VITE_OPENAI_API_KEY` secret
- **Static Deployment**: This deploys as a static site (frontend only)
- **Database**: For full functionality with database, consider deploying to Vercel, Netlify, or Railway instead

## Troubleshooting

### If deployment fails:
1. Check the Actions tab for error messages
2. Ensure your OpenAI API key is correctly set in secrets
3. Verify the repository is public

### If the AI chat doesn't work:
1. Check that `VITE_OPENAI_API_KEY` secret is set correctly
2. Ensure your OpenAI API key has credits available
3. Check browser console for any error messages

## Alternative Deployment Options

For full-stack deployment with database:
- **Vercel**: Excellent for full-stack apps
- **Railway**: Good for apps with databases  
- **Render**: Free tier available with databases
- **Heroku**: Reliable platform (paid)

## Support

If you need help with deployment, feel free to reach out at: aishniragh@icloud.com