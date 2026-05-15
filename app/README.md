# William B.A. Washington — Portfolio

Personal portfolio website built with React 19, TypeScript, Vite, Three.js, and GSAP.

## Deploy to GitHub Pages

### Step 1: Create a new GitHub repository

1. Go to https://github.com/new
2. Name it `idomusicstuff` (or whatever you prefer)
3. Make it **Public**
4. Do NOT initialize with README, .gitignore, or license
5. Click **Create repository**

### Step 2: Push your code

From this project folder, run:

```bash
# Initialize git (if not already done)
git init

# Add the GitHub remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/idomusicstuff.git

# Add all files
git add .

# Commit
git commit -m "Initial portfolio build"

# Push to main
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**
4. The workflow file in `.github/workflows/deploy.yml` will handle the rest

### Step 4: Set your custom domain (optional but recommended)

1. In Settings → Pages, under **Custom domain**, enter: `www.idomusicstuff.com`
2. Check **Enforce HTTPS**
3. Add these DNS records at your domain registrar:

| Type | Host | Points to |
|------|------|-----------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | YOUR_USERNAME.github.io |

Wait 5-10 minutes for DNS to propagate.

### Step 5: Your site is live

- **Default URL**: `https://YOUR_USERNAME.github.io/idomusicstuff/`
- **With custom domain**: `https://www.idomusicstuff.com`

## Updating the site

Whenever you make changes:

```bash
git add .
git commit -m "Description of changes"
git push origin main
```

GitHub Actions will automatically rebuild and deploy. Check the **Actions** tab in your repo to see deployment status.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- Three.js (hero particle system)
- GSAP + ScrollTrigger (animations)
- react-simple-maps (streaming globe)
- Lenis (smooth scroll)

## Data Sources

- **Chartmetric** — streaming data, airplay, social metrics
- **Viberate** — supplementary analytics

See `SITE_MAINTENANCE.md` for detailed content update instructions.
