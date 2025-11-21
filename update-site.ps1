# Update and push changes to GitHub
# Run this after making changes to your site

param(
    [string]$message = "Update accessibility site"
)

Write-Host "Checking for changes..." -ForegroundColor Cyan
git status

Write-Host ""
Write-Host "Adding all changes..." -ForegroundColor Cyan
git add .

Write-Host ""
Write-Host "Committing with message: $message" -ForegroundColor Cyan
git commit -m $message

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push

Write-Host ""
Write-Host "Done! Your changes will be live in 1-2 minutes." -ForegroundColor Green

# Get the Pages URL using gh if available
try {
    $username = gh api user --jq .login 2>$null
    $repoName = Split-Path -Leaf (Get-Location)
    if ($username) {
        Write-Host "Visit: https://$username.github.io/$repoName/" -ForegroundColor Yellow
    }
}
catch {
    Write-Host "Visit your GitHub Pages URL" -ForegroundColor Yellow
}
