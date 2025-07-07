# Swervy Cares - AI-Enhanced Self-Care Kit Platform

A modern web application for a nonprofit organization that empowers young girls through personalized self-care kits. The platform combines React frontend with Express backend, featuring AI-powered chat recommendations using OpenAI's GPT-4o model.

## 🌟 Features

- **AI-Powered Chat**: Intelligent recommendations based on age-appropriate conversations
- **Personalized Kits**: Custom self-care kits with 30+ color options and 16+ scent varieties
- **Age-Appropriate**: Different experiences for different age groups (12-year-olds vs 16-year-olds)
- **Confidence Building**: Focus on empowering young girls through thoughtful self-care
- **Community Impact**: Track and showcase real impact in communities

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **UI Components**: Radix UI with shadcn/ui
- **AI**: OpenAI GPT-4o for personalized recommendations
- **Database**: PostgreSQL with Drizzle ORM
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query)

## 📱 Live Demo

Visit the live application: [https://your-username.github.io/swervy-cares](https://your-username.github.io/swervy-cares)

## 🛠️ Local Development

1. Clone the repository:
```bash
git clone https://github.com/your-username/swervy-cares.git
cd swervy-cares
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with:
OPENAI_API_KEY=your_openai_api_key
VITE_OPENAI_API_KEY=your_openai_api_key
DATABASE_URL=your_database_url
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

## 🌍 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Manual Deployment Steps:

1. **Fork/Clone this repository**
2. **Set up GitHub Secrets**:
   - Go to Settings > Secrets and variables > Actions
   - Add `VITE_OPENAI_API_KEY` with your OpenAI API key
3. **Enable GitHub Pages**:
   - Go to Settings > Pages
   - Set Source to "Deploy from a branch"
   - Select "gh-pages" branch
4. **Push to main branch** - deployment happens automatically

## 📖 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
├── server/                # Backend Express application
│   ├── services/          # Business logic and AI integration
│   └── routes.ts          # API routes
├── shared/                # Shared TypeScript types and schemas
└── .github/workflows/     # GitHub Actions for deployment
```

## 🎯 Mission

Swervy Cares empowers young girls through personalized self-care kits and confidence-building experiences. Every kit sent carries the message: "You are worthy of care and attention."

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions about Swervy Cares, reach out to: aishniragh@icloud.com

---

Built with ❤️ for empowering young girls everywhere.