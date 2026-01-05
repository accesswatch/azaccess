# GitHub Pages Deployment Guide

## Quick Start (5 minutes)

### Option A: Using PowerShell Script (Easiest)

1. Open PowerShell in `c:\code\azaccess`
2. Run: `.\publish-to-github.ps1`
3. Follow the on-screen instructions
4. Create the GitHub repository when prompted
5. Run the provided commands to connect and push

### Option B: Manual Steps

#### 1. Initialize Git Repository

```powershell
cd c:\code\azaccess
git init
git add .
git commit -m "Initial commit: UA Digital Accessibility prototype"
git branch -M main
```

#### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `azaccess` (or your choice)
3. Description: "University of Arizona Digital Accessibility Resources"
4. **Public** (required for free GitHub Pages)
5. **Do NOT** check any initialize options
6. Click "Create repository"

#### 3. Connect and Push

Replace `YOUR-USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR-USERNAME/azaccess.git
git push -u origin main
```

If prompted for credentials, use a Personal Access Token (not password):
- Go to GitHub Settings > Developer settings > Personal access tokens > Tokens (classic)
- Generate new token with `repo` scope
- Use token as password

#### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Click **Pages** in left sidebar
4. Under "Build and deployment":
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/ (root)**
5. Click **Save**
6. Wait 1-2 minutes for deployment

#### 5. Access Your Site

Your site will be available at:
```
https://YOUR-USERNAME.github.io/azaccess/
```

The index.html will redirect to:
```
https://YOUR-USERNAME.github.io/azaccess/work/web/home.html
```

## Making Updates

After editing any files:

```powershell
# Quick update
.\update-site.ps1 "Description of changes"

# Or manually:
git add .
git commit -m "Your commit message"
git push
```

Changes go live automatically within 1-2 minutes.

## Site Structure

```
azaccess/
├── index.html              # Root redirect to home.html
├── README.md               # Main documentation
├── .gitignore             # Files to ignore
├── publish-to-github.ps1  # Initial setup script
├── update-site.ps1        # Update script
├── DEPLOY.md              # This file
└── work/
    └── web/
        ├── home.html              # Homepage
        ├── styles.css             # Shared styles
        ├── roles.html             # Role selection hub
        ├── accessibility-101.html # Intro guide
        ├── documents-media.html   # Documents hub
        ├── web-app.html          # Web & apps hub
        ├── teaching-learning.html # Teaching hub
        ├── procurement.html       # Procurement hub
        ├── policies-governance.html # Governance hub
        ├── tools-checklists.html  # Tools hub
        ├── support.html           # Support page
        ├── persona-*.html         # Individual role guides
        └── [45+ other pages]      # Additional content
```

## Troubleshooting

### "Permission denied" when pushing

- Use Personal Access Token instead of password
- Or set up SSH keys: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### "Repository not found"

- Double-check the repository URL
- Make sure you created the repository on GitHub first
- Verify you're using the correct username

### Site not updating

- Check GitHub Actions tab for build errors
- Clear your browser cache
- Wait a few minutes (can take up to 10 minutes)
- Verify GitHub Pages is enabled in Settings > Pages

### 404 errors on the site

- Make sure you're using the full URL including `/work/web/home.html`
- Or just use the root URL which auto-redirects
- Check that all files were committed and pushed

### Need to change repository name?

In GitHub repository settings, you can rename it. Then update your local remote:

```powershell
git remote set-url origin https://github.com/YOUR-USERNAME/NEW-NAME.git
```

## Custom Domain (Optional)

To use a custom domain like `accessibility.arizona.edu`:

1. Add a `CNAME` file in the root with your domain:
   ```
   accessibility.arizona.edu
   ```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `YOUR-USERNAME.github.io`

3. In GitHub Settings > Pages:
   - Enter your custom domain
   - Enable "Enforce HTTPS"

## Local Testing

Before pushing changes, test locally:

```powershell
# Python
python -m http.server 8000

# Then visit: http://localhost:8000/work/web/home.html
```

## Best Practices

- **Commit often** with clear messages
- **Test locally** before pushing
- **Use meaningful commit messages**: 
  - ✅ "Add WCAG 2.2 guidance to web hub"
  - ❌ "Update stuff"
- **Review changes** with `git status` and `git diff` before committing

## Resources

- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [Git basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [Markdown guide](https://www.markdownguide.org/)

## Need Help?

- GitHub Pages issues: https://github.com/orgs/community/discussions/categories/pages
- UA IT questions: accessibility@arizona.edu
