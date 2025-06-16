# Bimmy Development Setup Script (PowerShell)
# This script sets up the development environment for new contributors on Windows

$ErrorActionPreference = "Stop"

Write-Host "Setting up Bimmy development environment..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js $nodeVersion is installed" -ForegroundColor Green
} catch {
    Write-Host "Node.js is not installed. Please install Node.js 16+ and try again." -ForegroundColor Red
    exit 1
}

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Run quality checks
Write-Host "Running code quality checks..." -ForegroundColor Yellow
npm run lint:check
npm run format:check
npm run type-check
npm test

Write-Host ""
Write-Host "Setup complete! Your development environment is ready." -ForegroundColor Green
Write-Host ""
Write-Host "Read CONTRIBUTING.md for detailed guidelines" -ForegroundColor Yellow
Write-Host "Happy coding!" -ForegroundColor Green
