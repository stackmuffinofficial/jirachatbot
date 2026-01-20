# JiraChatbot Landing Page

Static landing page for JiraChatbot - deployable to GitHub Pages.

## Features

- Home page with early access form
- Pricing page with plan selection
- Privacy Policy
- Terms of Service
- Form submissions go directly to Autom Mate API

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deploy to GitHub Pages

### Option 1: Manual Deploy

1. Build the project:
   ```bash
   npm run build
   ```

2. The `dist` folder contains your static site

3. Push the `dist` folder contents to a `gh-pages` branch or configure GitHub Pages to serve from a specific folder

### Option 2: GitHub Actions (Recommended)

1. Create `.github/workflows/deploy.yml` in your repo:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. Go to your repo Settings > Pages > Set source to `gh-pages` branch

### Custom Domain

1. Add a `CNAME` file to the `public` folder with your domain:
   ```
   jirachatbot.com
   ```

2. Configure DNS at your domain registrar

## Configuration

### Base URL

If deploying to a subdirectory (e.g., `username.github.io/jirachatbot/`), update `vite.config.js`:

```js
export default defineConfig({
  base: '/jirachatbot/',
  // ...
});
```

For custom domain or root deployment, keep `base: '/'`.

## Tech Stack

- React 19
- React Router 7
- Vite 6
- Tailwind CSS 4
- Lucide React (icons)
