# UOWD Visa Renewal Form

A standalone React + Vite app for the UOWD student visa renewal / cancellation form. Stores progress in the browser (`localStorage`) — no backend required. Ready to swap to a real API later.

## What was cleaned up

This was extracted from a Replit multi-package export. Everything not needed to build and deploy this single app was removed:
- The `api-server`, `db`, `api-spec`, `api-client-react` workspace packages (unused by this app — it doesn't call any backend)
- The `mockup-sandbox` artifact
- Replit-only tooling: `.replit`, `.replitignore`, `.agents/`, `.local/` (agent skills, logs, state), `scripts/`
- Replit-only Vite plugins (`@replit/vite-plugin-*`) and the `PORT`/`BASE_PATH`/`REPL_ID` environment requirements in `vite.config.ts`
- `pnpm-workspace.yaml`, `pnpm-lock.yaml`, and the `catalog:`-versioned `package.json` — replaced with a plain, pinned `package.json` you can install with `npm`
- `.git` history from the Replit export

One real bug was also fixed: `Step3Personal.tsx` had a type that let `.trim()` be called on the `documents` field (an object, not a string), which broke `tsc`. Narrowed the type so it only applies to the actual text fields.

The app was rebuilt and typechecked from scratch after cleanup — `npm run build` and `npm run typecheck` both pass.

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## Deploy: GitHub → Netlify walkthrough

### 1. Push to GitHub

```bash
cd visa-renewal-form
git init
git add .
git commit -m "Initial commit"
```

Create a new empty repo on GitHub (no README/license, so it stays empty), then:

```bash
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### 2. Connect it to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) and log in.
2. Click **Add new site → Import an existing project**.
3. Choose **GitHub** and authorize Netlify if prompted, then select your new repo.
4. Netlify should auto-detect the build settings from `netlify.toml` in this repo:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

That's it — no environment variables are required since the app only uses browser `localStorage` right now.

### 3. After it's live

- Netlify gives you a random `*.netlify.app` URL by default — you can rename it or attach a custom domain under **Site settings → Domain management**.
- Every future `git push` to `main` will trigger an automatic new deploy.
- The `netlify.toml` includes a catch-all redirect to `index.html`, so refreshing the page on any route won't 404.

## Wiring to SharePoint later

Form state is centralized in `src/context/FormContext.tsx`, which currently reads/writes `localStorage`. When SharePoint access is ready, replace the `localStorage.getItem`/`setItem` calls in that one file with `fetch()` calls to your API — no changes needed anywhere else in the app.
