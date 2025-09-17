# IQRA Assistant POC Setup Script for Windows
Write-Host " Setting up IQRA Assistant POC..." -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node -v
    Write-Host " Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host " Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check Node.js version
$versionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($versionNumber -lt 18) {
    Write-Host " Node.js version 18+ is required. Current version: $nodeVersion" -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host " Installing dependencies..." -ForegroundColor Yellow
npm run install:all

if ($LASTEXITCODE -ne 0) {
    Write-Host " Failed to install dependencies" -ForegroundColor Red
    exit 1
}

Write-Host " Dependencies installed successfully" -ForegroundColor Green

# Create environment files if they don't exist
if (!(Test-Path "apps/backend/.env")) {
    Write-Host " Creating backend environment file..." -ForegroundColor Yellow
    Copy-Item "apps/backend/env.example" "apps/backend/.env"
    Write-Host "  Please update apps/backend/.env with your actual API keys" -ForegroundColor Yellow
}

if (!(Test-Path "apps/frontend/.env")) {
    Write-Host " Creating frontend environment file..." -ForegroundColor Yellow
    Copy-Item "apps/frontend/env.example" "apps/frontend/.env"
    Write-Host "  Please update apps/frontend/.env with your configuration" -ForegroundColor Yellow
}

# Build shared package
Write-Host " Building shared package..." -ForegroundColor Yellow
Set-Location "packages/shared"
npm run build
Set-Location "../.."

if ($LASTEXITCODE -ne 0) {
    Write-Host " Failed to build shared package" -ForegroundColor Red
    exit 1
}

Write-Host " Shared package built successfully" -ForegroundColor Green

Write-Host ""
Write-Host " Setup completed successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Update environment files with your API keys:" -ForegroundColor White
Write-Host "   - apps/backend/.env" -ForegroundColor Gray
Write-Host "   - apps/frontend/.env" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Set up your Supabase database:" -ForegroundColor White
Write-Host "   - Create a new Supabase project" -ForegroundColor Gray
Write-Host "   - Run the migrations from supabase/migrations/" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the development servers:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Or start individually:" -ForegroundColor White
Write-Host "   npm run dev:backend  # Backend on http://localhost:3000" -ForegroundColor Gray
Write-Host "   npm run dev:frontend # Frontend on http://localhost:5173" -ForegroundColor Gray
Write-Host ""
Write-Host " API Documentation: http://localhost:3000/api" -ForegroundColor Cyan
Write-Host " Run tests: .\tests\curl-tests.sh" -ForegroundColor Cyan
