# Quick start script for publishing to GitHub Pages
# Run this from PowerShell in c:\code\azaccess

# Step 1: Initialize git repository (if not already done)
Write-Host "Initializing git repository..." -ForegroundColor Cyan
git init

# Step 2: Add all files
Write-Host "Adding files..." -ForegroundColor Cyan
git add .

# Step 3: Create initial commit
Write-Host "Creating initial commit..." -ForegroundColor Cyan
git commit -m "Initial commit: University of Arizona Digital Accessibility prototype site"

# Step 4: Set main branch
Write-Host "Setting main branch..." -ForegroundColor Cyan
git branch -M main

# Step 5: Instructions for remote
Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
Write-Host "Next steps to publish to GitHub Pages:" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host ""
Write-Host "1. Create a new repository on GitHub:" -ForegroundColor Yellow
Write-Host "   - Go to https://github.com/new" -ForegroundColor White
Write-Host "   - Name: azaccess (or your preferred name)" -ForegroundColor White
Write-Host "   - Keep it public" -ForegroundColor White
Write-Host "   - DON'T initialize with README, .gitignore, or license" -ForegroundColor White
Write-Host ""
Write-Host "2. Run these commands (replace YOUR-USERNAME):" -ForegroundColor Yellow
Write-Host "   git remote add origin https://github.com/YOUR-USERNAME/azaccess.git" -ForegroundColor White
Write-Host "   git push -u origin main" -ForegroundColor White
Write-Host ""
Write-Host "3. Enable GitHub Pages:" -ForegroundColor Yellow
Write-Host "   - Go to repository Settings > Pages" -ForegroundColor White
Write-Host "   - Source: Deploy from a branch" -ForegroundColor White
Write-Host "   - Branch: main, folder: / (root)" -ForegroundColor White
Write-Host "   - Save and wait 1-2 minutes" -ForegroundColor White
Write-Host ""
Write-Host "4. Your site will be live at:" -ForegroundColor Yellow
Write-Host "   https://YOUR-USERNAME.github.io/azaccess/" -ForegroundColor White
Write-Host ""
Write-Host "===============================================" -ForegroundColor Green
