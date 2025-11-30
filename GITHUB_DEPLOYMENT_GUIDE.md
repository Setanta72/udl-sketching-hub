# GitHub Pages Deployment Guide

**Last Updated**: November 11, 2025
**Estimated Time**: 15-30 minutes
**Cost**: $0

---

## Prerequisites

- GitHub account (free)
- Git installed on your computer
- Repository initialized (we'll do this below if not done)

---

## Step 1: Update Configuration

Before deploying, update the Astro configuration with your GitHub details.

### Edit `astro.config.mjs`

Open `astro.config.mjs` and update these lines:

```javascript
site: 'https://yourusername.github.io', // Replace "yourusername" with YOUR GitHub username
base: '/udl-sketching-hub', // Replace if your repo name is different
```

**Example**:
If your GitHub username is `jsmith` and your repo is named `udl-sketching-hub`:
```javascript
site: 'https://jsmith.github.io',
base: '/udl-sketching-hub',
```

Your final URL will be: `https://jsmith.github.io/udl-sketching-hub/`

**Special Case**: If you want to use a root user/org site (like `https://jsmith.github.io/`):
- Repository must be named: `jsmith.github.io`
- Config: `site: 'https://jsmith.github.io'` and `base: '/'` (or omit base)

---

## Step 2: Create GitHub Repository

### Option A: Via GitHub Website (Recommended)

1. Go to https://github.com/new
2. Repository name: `udl-sketching-hub` (or your preferred name)
3. Description: "UDL Sketching Hub - Progressive Mastery Learning Platform"
4. Visibility: **Public** (required for free GitHub Pages)
5. Do NOT initialize with README (you already have files)
6. Click "Create repository"

### Option B: Via GitHub CLI (if you have `gh` installed)

```bash
gh repo create udl-sketching-hub --public --description "UDL Sketching Hub - Progressive Mastery Learning Platform"
```

---

## Step 3: Initialize Git and Push to GitHub

Open Terminal in your project directory and run these commands:

### If Git is NOT initialized yet:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - v2.0 complete prototype"

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/udl-sketching-hub.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

### If Git is ALREADY initialized:

```bash
# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/udl-sketching-hub.git

# Push to GitHub
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username.

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/udl-sketching-hub`

2. Click **Settings** (top right of repository)

3. In left sidebar, click **Pages**

4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - (NOT "Deploy from a branch")

5. Click **Save** if prompted

**That's it!** The GitHub Actions workflow (`.github/workflows/deploy.yml`) will handle the rest.

---

## Step 5: First Deployment

### Automatic Deployment

The GitHub Actions workflow will trigger automatically when you pushed to the `main` branch.

### Monitor the Deployment

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. You should see a workflow run called "Deploy to GitHub Pages"
4. Click on it to see the progress

The build typically takes **2-3 minutes**.

### Deployment Stages

You'll see two jobs:
1. **build** - Installs dependencies and builds the Astro site
2. **deploy** - Deploys the built site to GitHub Pages

### When Complete

Once both jobs show green checkmarks:
- Your site is live!
- URL: `https://YOUR_USERNAME.github.io/udl-sketching-hub/`
- GitHub will also show the URL in the Actions summary

---

## Step 6: Verify Deployment

### Check Your Live Site

Visit: `https://YOUR_USERNAME.github.io/udl-sketching-hub/`

**Expected Results**:
- ✅ Homepage loads with all 7 modules
- ✅ Clicking any module loads the module page
- ✅ All navigation works
- ✅ Styling is intact
- ✅ No broken links (except placeholder images/videos)

### Common Issues and Fixes

#### Issue: Site shows 404
**Cause**: Repository name doesn't match `base` in config
**Fix**:
- Check your repo name on GitHub
- Update `base: '/your-actual-repo-name'` in `astro.config.mjs`
- Commit and push changes

#### Issue: Styles not loading
**Cause**: Base path not set correctly
**Fix**:
- Ensure `base: '/udl-sketching-hub'` matches your repo name
- Rebuild and redeploy

#### Issue: "workflow_dispatch" permission denied
**Cause**: GitHub Actions not enabled for repository
**Fix**:
- Go to Settings → Actions → General
- Enable "Allow all actions and reusable workflows"
- Save

---

## Step 7: Making Updates

### After initial deployment, updating is easy:

```bash
# Make your changes to files

# Stage changes
git add .

# Commit with descriptive message
git commit -m "Update module 3 content"

# Push to GitHub
git push

# Deployment happens automatically!
```

Every push to the `main` branch triggers a new deployment. Changes are live in ~3 minutes.

---

## Step 8: Custom Domain (Optional)

If you want to use a custom domain like `sketching-hub.yourdomain.edu`:

### DNS Configuration

1. Add a CNAME record in your domain DNS:
   ```
   Type: CNAME
   Name: sketching-hub (or your subdomain)
   Value: YOUR_USERNAME.github.io
   ```

2. Wait for DNS propagation (5-60 minutes)

### GitHub Configuration

1. Go to repository Settings → Pages
2. Under "Custom domain", enter: `sketching-hub.yourdomain.edu`
3. Click Save
4. Check "Enforce HTTPS" (wait a few minutes for certificate)

### Update Astro Config

```javascript
site: 'https://sketching-hub.yourdomain.edu',
base: '/', // Use root when on custom domain
```

Commit and push the change.

---

## Step 9: Set Up Feedback Collection

### Add Google Form

1. Create a Google Form with these questions:
   - Which module did you complete? (dropdown)
   - What was most helpful?
   - What was confusing or unclear?
   - What would you like to see added?
   - Would you purchase a printed workbook? (Yes/No/Maybe)
   - Email (optional for follow-up)

2. Get the form URL

3. Add feedback link to your site (future enhancement)

### Add Simple Analytics (Optional)

**Option 1: Plausible Analytics** ($9/month, privacy-friendly)
- Sign up at https://plausible.io
- Add tracking script to `src/layouts/BaseLayout.astro`

**Option 2: Google Analytics** (Free, more features)
- Create GA4 property
- Add tracking code to `src/layouts/BaseLayout.astro`

---

## Step 10: Share with Testers

### Create a Testing Plan

1. **Recruit 10-15 initial testers**:
   - Faculty colleagues
   - Graduate students
   - Design educators from other institutions
   - Professional designers

2. **Provide clear instructions**:
   ```
   We're testing a new sketching pedagogy platform.

   URL: https://YOUR_USERNAME.github.io/udl-sketching-hub/

   Please:
   - Complete at least one full module
   - Note anything confusing or helpful
   - Complete feedback form: [FORM_URL]
   - Timeline: 1-2 weeks

   Thank you for helping improve design education!
   ```

3. **Set expectations**:
   - This is a prototype (mention placeholder images)
   - Focus is on pedagogical approach and content clarity
   - Not all interactive features implemented yet

### Testing Checklist for Testers

Share this with your testers:

- [ ] Can you understand the progressive mastery approach?
- [ ] Are the concept explanations clear?
- [ ] Are the practice drills actionable?
- [ ] Do the scaffolding suggestions feel helpful or patronizing?
- [ ] Is the "when to use aids" guidance valuable?
- [ ] Would you use this in a class?
- [ ] Would you recommend to students?
- [ ] What's missing that you expected to see?

---

## Maintenance & Updates

### Regular Tasks

**Weekly (During Testing Phase)**:
- Check GitHub Actions for failed builds
- Review any user feedback received
- Note common questions or confusion points

**As Needed**:
- Update content based on feedback
- Fix any reported bugs
- Add new features

### Monitoring

**GitHub Actions**:
- Automatically emails you if builds fail
- Check Actions tab for build status

**Site Availability**:
- GitHub Pages has 99.9%+ uptime
- No monitoring needed for most cases

---

## Backup Strategy

Your code is already backed up:
- Git history (full version control)
- GitHub remote (cloud backup)
- Local `_backups/` directory

### Before Major Changes

```bash
# Create a git tag
git tag -a v2.1-pre-print -m "Before print mockup development"
git push --tags

# Or create a new backup
cp -r . ../_backups/v2.1-$(date +%Y%m%d)/
```

---

## Cost Breakdown

| Item | Cost |
|------|------|
| GitHub Pages hosting | $0 |
| Domain (if using custom) | $10-15/year (optional) |
| Analytics (Plausible) | $0-9/month (optional) |
| **Total (basic)** | **$0/month** |

---

## Troubleshooting

### Build Fails

**Check the Actions log**:
1. Go to Actions tab
2. Click failed workflow
3. Expand failed job to see error

**Common errors**:
- Dependency issues: Delete `node_modules` and `package-lock.json`, run `npm install`
- TypeScript errors: Check for schema validation issues
- Build timeout: Usually resolves on retry

### Site Not Updating

**Force a new deployment**:
```bash
# Make a trivial change
echo "\n" >> README.md

# Commit and push
git add README.md
git commit -m "Trigger redeploy"
git push
```

### Permission Errors

**If GitHub Actions can't deploy**:
1. Settings → Actions → General
2. Workflow permissions: Select "Read and write permissions"
3. Save

---

## Success Criteria

After deployment, you should have:

- ✅ Live site accessible at your GitHub Pages URL
- ✅ All 7 modules visible and functional
- ✅ Automatic deployment on every push
- ✅ Initial testers recruited
- ✅ Feedback collection mechanism in place

---

## Next Steps

Once deployed and gathering feedback:

1. **Week 1-2**: Share with initial testers, gather feedback
2. **Week 3-4**: Analyze feedback, identify top priorities
3. **Month 2**: Begin print mockup development (see PRINT_PRODUCTION_GUIDE.md)
4. **Month 2-3**: Create real gallery images for highest-priority modules

---

## Questions?

Common questions:

**Q: Can I deploy to a private repository?**
A: GitHub Pages requires public repos on free accounts. GitHub Pro ($4/month) allows private repos.

**Q: What if I want to use a different branch?**
A: Edit `.github/workflows/deploy.yml`, change `branches: [main]` to `branches: [your-branch]`

**Q: Can I see deployment history?**
A: Yes, Actions tab shows all deployments. Each links to the commit that triggered it.

**Q: How do I take the site down?**
A: Settings → Pages → Source → Select "None" and save. Or make repo private (disables Pages).

**Q: Can I preview changes before deploying?**
A: Yes! Run `npm run dev` locally to preview. Or use Netlify/Vercel preview deployments for staging.

---

## Summary Commands

```bash
# Initial deployment
git init
git add .
git commit -m "Initial commit - v2.0 complete prototype"
git remote add origin https://github.com/YOUR_USERNAME/udl-sketching-hub.git
git branch -M main
git push -u origin main

# Future updates
git add .
git commit -m "Describe your changes"
git push

# Check site
open https://YOUR_USERNAME.github.io/udl-sketching-hub/
```

---

**You're ready to deploy!** Follow the steps above, and your site will be live within 30 minutes.

**End of GitHub Deployment Guide**
