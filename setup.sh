#!/bin/bash

echo "🚀 Setting up IQRA Assistant POC..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create environment files if they don't exist
if [ ! -f "apps/backend/.env" ]; then
    echo "📝 Creating backend environment file..."
    cp apps/backend/env.example apps/backend/.env
    echo "⚠️  Please update apps/backend/.env with your actual API keys"
fi

if [ ! -f "apps/frontend/.env" ]; then
    echo "📝 Creating frontend environment file..."
    cp apps/frontend/env.example apps/frontend/.env
    echo "⚠️  Please update apps/frontend/.env with your configuration"
fi

# Build shared package
echo "🔨 Building shared package..."
cd packages/shared
npm run build
cd ../..

if [ $? -ne 0 ]; then
    echo "❌ Failed to build shared package"
    exit 1
fi

echo "✅ Shared package built successfully"

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update environment files with your API keys:"
echo "   - apps/backend/.env"
echo "   - apps/frontend/.env"
echo ""
echo "2. Set up your Supabase database:"
echo "   - Create a new Supabase project"
echo "   - Run the migrations from supabase/migrations/"
echo ""
echo "3. Start the development servers:"
echo "   npm run dev"
echo ""
echo "4. Or start individually:"
echo "   npm run dev:backend  # Backend on http://localhost:3000"
echo "   npm run dev:frontend # Frontend on http://localhost:5173"
echo ""
echo "📚 API Documentation: http://localhost:3000/api"
echo "🧪 Run tests: ./tests/curl-tests.sh"

