# Swervy Cares - AI-Enhanced Self-Care Kit Platform

## Overview

Swervy Cares is a modern web application for a nonprofit organization that empowers young girls through personalized self-care kits. The platform combines React frontend with Express backend, featuring AI-powered chat recommendations using OpenAI's GPT-4o model to help users find their perfect self-care kit.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom Swervy Cares brand colors
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **AI Integration**: OpenAI GPT-4o for chat responses and kit recommendations
- **Session Management**: Express sessions with PostgreSQL storage

## Key Components

### 1. AI Chat System
- **Purpose**: Provides personalized chat experience to help users discover their ideal self-care kit
- **Implementation**: OpenAI GPT-4o integration with custom system prompts for age-appropriate responses
- **Features**: Real-time chat widget, recommendation generation based on conversation history

### 2. Kit Request System
- **Purpose**: Handles self-care kit requests with personalized preferences
- **Components**: Form validation, data collection, AI suggestion integration
- **Data Flow**: User input → Form validation → Database storage → Email notification

### 3. UI Component System
- **Architecture**: Modular component design using shadcn/ui
- **Styling**: CSS variables for theming, responsive design patterns
- **Accessibility**: Built on Radix UI primitives for full accessibility compliance

### 4. Database Schema
- **Users**: Basic user authentication (prepared for future use)
- **Kit Requests**: Complete kit request data with AI suggestions
- **Chat Sessions**: Conversation history and recommendations storage

## Data Flow

1. **User Interaction**: User visits homepage and can either start AI chat or fill kit request form directly
2. **AI Chat Flow**: 
   - User sends message → Backend processes with OpenAI → AI response returned
   - Chat history accumulated → Recommendations generated → User can apply to form
3. **Kit Request Flow**:
   - Form completion → Validation → Data submission → Database storage
   - Email notifications sent to organization for fulfillment

## External Dependencies

### Core Dependencies
- **OpenAI API**: GPT-4o model for AI chat and recommendations
- **Neon Database**: Serverless PostgreSQL for data persistence
- **Google Sheets Integration**: Maintains existing workflow compatibility
- **Email Service**: Form submissions trigger email notifications

### Development Dependencies
- **Vite**: Development server and build tool
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first styling framework
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Build Process
- Frontend: Vite builds React app to `dist/public`
- Backend: esbuild bundles Express server to `dist/index.js`
- Single deployment artifact with static file serving

### Environment Configuration
- **Development**: `NODE_ENV=development` with Vite dev server
- **Production**: `NODE_ENV=production` with built assets
- **Database**: `DATABASE_URL` for PostgreSQL connection
- **AI**: `OPENAI_API_KEY` for OpenAI integration

### Hosting Requirements
- Node.js runtime environment
- PostgreSQL database access
- Environment variable support
- Static file serving capability

## Recent Changes
- January 7, 2025: Major AI enhancements and blog updates completed
  - Enhanced AI chat with age-appropriate responses (12-year-olds vs 16-year-olds)
  - Added 30+ color options and 16+ scent varieties with thoughtful naming
  - Implemented conversation memory that considers school context and confidence-building
  - Updated blog with authentic founder story about Swervy Cosmetics journey (2019-2022)
  - Enhanced AI recommendations with personalized reasoning showing understanding
  - Updated Maya Chen success story timeline to 1 month
  - Set Reflection and Community blog posts to "Coming Soon" status
  - Updated realistic numbers: 7 girls helped, 0 active partnerships but templates ready
  - Updated FAQ delivery time to 5-7 days (max 2 weeks)
  - All partnership showcase shows "Coming Soon" with ready templates

## Changelog
- June 30, 2025: Initial setup
- January 7, 2025: Major feature enhancements and UX improvements

## User Preferences

Preferred communication style: Simple, everyday language.
Analytics: User prefers not to use Google Analytics tracking.