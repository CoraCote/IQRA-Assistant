# IQRA Assistant - AI Restaurant Ordering POC

A proof-of-concept AI-powered restaurant assistant that can handle voice calls, text chats, process orders, send SMS confirmations, and log conversation transcripts.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React + Vite, Tailwind CSS, React Query, Context API
- **Backend**: NestJS (TypeScript), REST API + Swagger
- **Database**: Supabase (PostgreSQL)
- **AI/Voice**: ElevenLabs Agents Platform (TTS/STT)
- **LLM**: OpenAI GPT-4 Turbo
- **SMS**: Twilio
- **Deployment**: Frontend on Vercel/Netlify, Backend on Render

### Monorepo Structure
```
/apps
  /frontend (React+Vite)
  /backend  (NestJS)
/packages/shared (Zod schemas, DTOs)
/supabase/migrations (Database schema)
/tests (API tests)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- OpenAI API key
- ElevenLabs API key
- Twilio account

### 1. Clone and Install
```bash
git clone <repository-url>
cd IQRA-Assistant
npm run install:all
```

### 2. Database Setup
1. Create a new Supabase project
2. Run the migrations:
```bash
# Apply migrations in Supabase dashboard or using CLI
# Files: supabase/migrations/001_initial_schema.sql
#        supabase/migrations/002_seed_data.sql
```

### 3. Environment Configuration

**Backend** (`apps/backend/.env`):
```env
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=your_twilio_phone_number_here
```

**Frontend** (`apps/frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:3000
VITE_PUBLIC_AGENT_ID=your_elevenlabs_agent_id_here
```

### 4. Run Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or run separately:
npm run dev:backend  # Backend on http://localhost:3000
npm run dev:frontend # Frontend on http://localhost:5173
```

## 📚 API Documentation

### Core Endpoints

#### Health Check
```bash
GET /health
# Response: { "status": "ok" }
```

#### Menu
```bash
GET /menu
# Response: { "items": [...], "modifiers": [...] }
```

#### Orders
```bash
POST /order/draft
# Body: { "customer_input": "...", "menu_items": [...], "menu_modifiers": [...] }
# Response: { "order": {...}, "confidence_score": 0.85, "clarification_needed": false }

POST /order/commit
# Body: { "order": {...} }
# Response: { "order_id": "...", "status": "confirmed", "message": "..." }
```

#### SMS
```bash
POST /sms/send
# Body: { "to": "+1234567890", "message": "..." }
# Response: { "message_id": "...", "status": "..." }
```

#### Transcripts
```bash
POST /transcript/intake
# Body: { "session_id": "...", "customer_phone": "...", "transcript_text": "...", "order_id": "..." }
# Response: { "transcript_id": "...", "status": "saved" }
```

#### Admin
```bash
GET /admin/metrics
# Response: { "total_orders": 0, "total_transcripts": 0, "orders_today": 0, "transcripts_today": 0, "average_order_value": 0 }
```

### ElevenLabs Integration
All core endpoints are also available under `/tools/*` for ElevenLabs Agent integration:
- `/tools/health`
- `/tools/menu`
- `/tools/order/draft`
- `/tools/order/commit`
- `/tools/sms/send`
- `/tools/transcript/intake`
- `/tools/admin/metrics`

## 🧪 Testing

### Run API Tests
```bash
# Make the test script executable
chmod +x tests/curl-tests.sh

# Run all tests
./tests/curl-tests.sh
```

### Manual Testing
1. **Health Check**: `curl http://localhost:3000/health`
2. **Get Menu**: `curl http://localhost:3000/menu`
3. **Draft Order**: Use the frontend chat or API
4. **Admin Dashboard**: Visit `http://localhost:5173/admin`

## 🎯 Features

### Frontend
- **Main Page** (`/`): ElevenLabs chat widget + fallback text chat
- **Admin Page** (`/admin`): Real-time metrics dashboard
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Real-time Updates**: React Query for data fetching

### Backend
- **REST API**: Full CRUD operations with Swagger docs
- **AI Integration**: OpenAI GPT-4 for order processing
- **SMS Service**: Twilio integration for confirmations
- **Database**: Supabase with proper indexing and relationships
- **Validation**: Zod schemas for type safety

### Database Schema
- `menu_items`: Restaurant menu items
- `menu_modifiers`: Sizes, toppings, special instructions
- `orders`: Customer orders with JSONB items
- `order_items`: Detailed order tracking
- `transcripts`: Conversation logs

## 🔧 Development

### Available Scripts
```bash
# Root level
npm run dev              # Start both frontend and backend
npm run build            # Build all packages
npm run install:all      # Install all dependencies

# Backend
cd apps/backend
npm run start:dev        # Start in development mode
npm run build            # Build for production
npm run test             # Run tests

# Frontend
cd apps/frontend
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build

# Shared package
cd packages/shared
npm run build            # Build TypeScript
npm run dev              # Watch mode
```

### Code Structure
- **Shared Package**: Zod schemas, TypeScript types, DTOs
- **Backend**: NestJS modules for each feature area
- **Frontend**: React components with hooks and services
- **Database**: SQL migrations with proper relationships

## 🚀 Deployment

### Backend (Render)
1. Connect GitHub repository
2. Set environment variables
3. Deploy from main branch
4. Set build command: `cd apps/backend && npm install && npm run build`
5. Set start command: `cd apps/backend && npm run start:prod`

### Frontend (Vercel/Netlify)
1. Connect GitHub repository
2. Set build command: `cd apps/frontend && npm install && npm run build`
3. Set output directory: `apps/frontend/dist`
4. Set environment variables

### Database (Supabase)
1. Create new project
2. Run migrations from `supabase/migrations/`
3. Configure RLS policies if needed
4. Get connection details for environment variables

## 📊 Monitoring

### Admin Dashboard
- Total orders and transcripts
- Daily metrics
- Average order value
- System status indicators

### API Health
- Health check endpoint
- Swagger documentation at `/api`
- Error logging and monitoring

## 🔐 Security

### Environment Variables
- All sensitive data in environment variables
- No hardcoded API keys or secrets
- Separate development and production configs

### API Security
- Input validation with Zod schemas
- CORS configuration
- Rate limiting (can be added)
- Error handling without sensitive data exposure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is a proof-of-concept and is not intended for production use without proper security review and testing.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection**: Check Supabase URL and service role key
2. **API Keys**: Verify all required API keys are set
3. **CORS Issues**: Check FRONTEND_URL in backend environment
4. **Build Errors**: Ensure all dependencies are installed with `npm run install:all`

### Getting Help
- Check the API documentation at `http://localhost:3000/api`
- Review the curl tests in `tests/curl-tests.sh`
- Check console logs for detailed error messages

