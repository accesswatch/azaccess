# Automated GitHub Pages Deployment using GitHub CLI
# Run this from PowerShell in c:\code\azaccess

param(
    [string]$repoName = "azaccess",
    [string]$description = "University of Arizona Digital Accessibility Resources",
    [switch]$private = $false
)

Write-Host "=============================================" -ForegroundColor Cyan
Write-Host "  GitHub Pages Automated Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Check if gh is installed
Write-Host "Checking for GitHub CLI..." -ForegroundColor Yellow
try {
    $ghVersion = gh --version 2>&1
    Write-Host "✓ GitHub CLI found: $($ghVersion[0])" -ForegroundColor Green
} catch {
    Write-Host "✗ GitHub CLI not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install GitHub CLI:" -ForegroundColor Yellow
    Write-Host "  winget install --id GitHub.cli" -ForegroundColor White
    Write-Host "  or download from: https://cli.github.com/" -ForegroundColor White
    Write-Host ""
    Write-Host "After installing, run: gh auth login" -ForegroundColor Yellow
    exit 1
}

# Check if authenticated
Write-Host "Checking GitHub authentication..." -ForegroundColor Yellow
$authStatus = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Not authenticated with GitHub" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please authenticate:" -ForegroundColor Yellow
    Write-Host "  gh auth login" -ForegroundColor White
    Write-Host ""
    exit 1
}
Write-Host "✓ Authenticated with GitHub" -ForegroundColor Green
Write-Host ""

# Initialize git if needed
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    git branch -M main
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

# Add and commit files
Write-Host "Staging files..." -ForegroundColor Yellow
git add .

Write-Host "Creating commit..." -ForegroundColor Yellow
git commit -m "Initial commit: University of Arizona Digital Accessibility prototype site" 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Files committed" -ForegroundColor Green
} else {
    Write-Host "✓ No changes to commit (already committed)" -ForegroundColor Green
}
Write-Host ""

# Create GitHub repository
Write-Host "Creating GitHub repository '$repoName'..." -ForegroundColor Yellow
$visibility = if ($private) { "--private" } else { "--public" }

$createResult = gh repo create $repoName --source=. --description=$description $visibility --push 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Repository created and pushed" -ForegroundColor Green
} else {
    if ($createResult -like "*already exists*") {
        Write-Host "✓ Repository already exists" -ForegroundColor Green
        Write-Host "Pushing to existing repository..." -ForegroundColor Yellow
        
        # Add remote if it doesn't exist
        $remotes = git remote
        if ($remotes -notcontains "origin") {
            $username = gh api user --jq .login
            git remote add origin "https://github.com/$username/$repoName.git"
        }
        
        git push -u origin main --force
        Write-Host "✓ Pushed to GitHub" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to create repository" -ForegroundColor Red
        Write-Host $createResult
        exit 1
    }
}
Write-Host ""

# Enable GitHub Pages
Write-Host "Enabling GitHub Pages..." -ForegroundColor Yellow
try {
    # Enable Pages with main branch and root directory
    gh api -X POST "/repos/{owner}/$repoName/pages" -f source[branch]=main -f source[path]='/' 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ GitHub Pages enabled" -ForegroundColor Green
    } else {
        # Pages might already be enabled
        $pagesStatus = gh api "/repos/{owner}/$repoName/pages" 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✓ GitHub Pages already enabled" -ForegroundColor Green
        } else {
            Write-Host "⚠ Could not enable Pages automatically" -ForegroundColor Yellow
            Write-Host "  Please enable manually: Settings > Pages" -ForegroundColor White
        }
    }
} catch {
    Write-Host "⚠ Could not enable Pages automatically" -ForegroundColor Yellow
    Write-Host "  Please enable manually: Settings > Pages" -ForegroundColor White
}
Write-Host ""

# Get the repository URL
$username = gh api user --jq .login
$repoUrl = "https://github.com/$username/$repoName"
$pagesUrl = "https://$username.github.io/$repoName/"

Write-Host "=============================================" -ForegroundColor Green
Write-Host "  🎉 Deployment Complete!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Repository:" -ForegroundColor Cyan
Write-Host "  $repoUrl" -ForegroundColor White
Write-Host ""
Write-Host "Live Site (available in 1-2 minutes):" -ForegroundColor Cyan
Write-Host "  $pagesUrl" -ForegroundColor White
Write-Host ""
Write-Host "Homepage:" -ForegroundColor Cyan
Write-Host "  $pagesUrl" -ForegroundColor White
Write-Host "  (redirects to: ${pagesUrl}work/web/home.html)" -ForegroundColor Gray
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Wait 1-2 minutes for GitHub Pages to build" -ForegroundColor White
Write-Host "  2. Visit the live site URL above" -ForegroundColor White
Write-Host "  3. To update: .\update-site.ps1 'Your message'" -ForegroundColor White
Write-Host ""
Write-Host "Open in browser now? (Y/N)" -ForegroundColor Yellow
$response = Read-Host
if ($response -eq 'Y' -or $response -eq 'y') {
    Start-Process $repoUrl
    Write-Host "Opening repository in browser..." -ForegroundColor Green
    Write-Host "Remember to enable Pages if not automatic: Settings > Pages" -ForegroundColor Yellow
}
Write-Host ""
Write-Host "Done! 🚀" -ForegroundColor Green
