# Netlify Deployment Guide for Swervy Cares

## Why Netlify?
- **Free tier** with generous limits
- **Serverless functions** - Your AI chat will work perfectly
- **Automatic deployments** from GitHub
- **Custom domains** available
- **Works after canceling Replit** - Complete independence

## Step-by-Step Deployment

### 1. First, Upload to GitHub
Follow the GitHub deployment steps to get your code on GitHub first.

### 2. Sign up for Netlify
1. Go to **netlify.com**
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (easier)
4. Authorize Netlify to access your GitHub

### 3. Deploy Your Site
1. Click **"New site from Git"**
2. Choose **"GitHub"**
3. Select your **"swervy-cares"** repository
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click **"Deploy site"**

### 4. Add Environment Variables
1. Go to **Site settings** > **Environment variables**
2. Add these variables:
   - `VITE_OPENAI_API_KEY` = Your OpenAI API key
   - `OPENAI_API_KEY` = Your OpenAI API key (same value)

### 5. Enable Functions
1. Go to **Site settings** > **Functions**
2. Functions directory should show: `netlify/functions`
3. Your AI chat endpoints will be available at:
   - `https://yoursite.netlify.app/.netlify/functions/chat`
   - `https://yoursite.netlify.app/.netlify/functions/recommendations`

### 6. Custom Domain (Optional)
1. Go to **Site settings** > **Domain management**
2. Add your custom domain
3. Netlify handles SSL certificates automatically

## What You Get
- **Full AI chat functionality** - Works exactly like in Replit
- **Automatic deployments** - Push to GitHub, site updates automatically
- **Free hosting** - No monthly fees
- **Professional URL** - yoursite.netlify.app
- **Fast global CDN** - Your site loads quickly worldwide

## Important Notes
- **First deployment** takes 3-5 minutes
- **Subsequent deployments** take 1-2 minutes
- **AI chat requires** OpenAI API key in environment variables
- **Form submissions** are handled by Netlify Functions
- **Database features** would need additional setup (not needed for current site)

## Troubleshooting
- **Build fails?** Check that `npm run build` works locally
- **AI chat not working?** Verify OpenAI API key in environment variables
- **Functions not working?** Check the Functions tab in Netlify dashboard
- **Site not updating?** Check the Deploys tab for build status

## Cost Comparison
- **Netlify Free**: 100GB bandwidth, 300 build minutes/month
- **Netlify Pro**: $19/month for more limits (only if you need it)
- **Much cheaper** than keeping Replit subscription just for hosting

Your Swervy Cares website will work perfectly on Netlify with full AI functionality!