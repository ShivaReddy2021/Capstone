# SMRbuilders — docs copy for GitHub Pages

This folder is a copy of the SMRbuilders static site intended for publishing via GitHub Pages from the repository `docs/` folder.

How to publish
1. Commit and push the `docs/` folder to your repository's `main` branch.
2. On GitHub, go to Settings → Pages and select Branch: `main`, Folder: `/docs`.
3. Save — GitHub will build and publish the site at `https://<your-username>.github.io/<repo>/`.

Formspree
Replace the placeholder `{your_form_id}` in `contact.html` with the Formspree form ID you create.

Local viewing without Python

If Python is not available you can still run the site locally:

- PowerShell (no extra installs):

```powershell
# from repo root
./tools/serve.ps1 -Root .\docs -Port 8000
# then open http://localhost:8000
```

- Node.js (if installed):

```powershell
# from repo root
node tools/static-server.js docs 8000
# open http://localhost:8000
```

Deploy to Cloudflare Pages (CI)

If you prefer Cloudflare Pages you can deploy the `docs/` site automatically from GitHub using the included workflow `.github/workflows/deploy-cloudflare.yml`.

Setup steps:
1. Create a Cloudflare account and a Pages project (or use the API). Note the Pages project name and your Cloudflare Account ID.
2. Create an API token for the Pages Deployments. Recommended permissions: "Account - Pages: Edit" (or the Pages Deploy permission) and optionally read permissions for Account details.
3. In your GitHub repository, add the following repository secrets (Settings → Secrets → Actions):
	- `CLOUDFLARE_API_TOKEN` — the API token you created.
	- `CLOUDFLARE_ACCOUNT_ID` — your Cloudflare account id.
	- `CLOUDFLARE_PROJECT_NAME` — Pages project name (the Pages site name in Cloudflare).
4. Push to `main` or any `feature_*` branch (the workflow triggers on those pushes), or run the workflow manually from Actions and set the `ref` input to your branch.

Release branches

This repository is prepared so both feature and release branches can trigger deployments. Use these naming patterns:
- Feature branches: `feature_xxx` or under `feature/xxx` (e.g. `feature_02/09.26` or `feature/new-homepage`)
- Release branches: `release_xxx` or under `release/xxx` (e.g. `release_1.0` or `release/v1.0`)

To deploy a release branch:
1. Push your release branch to GitHub:

```powershell
git checkout -b release_1.0
git add .
git commit -m "Prepare release 1.0"
git push origin release_1.0
```

2. The Cloudflare Pages workflow (`deploy-cloudflare.yml`) or the GitHub Pages workflow (`deploy-pages.yml`) will run automatically for release branches. You can also run them manually from the Actions tab selecting the workflow and providing the `ref` input (enter the release branch name).

Branch previews and production:
- If you connect Cloudflare Pages directly to GitHub (Option A), branch and PR previews are automatic.
- Using the Actions-based deployment (Option B) with the API token also supports deploying release branches — the workflow checks out and deploys the chosen branch's `docs/` folder.

Notes:
- Alternatively, you can connect Cloudflare Pages directly to GitHub in the Cloudflare dashboard and enable automatic deploys and branch previews without creating the token or action — that is often easier and provides preview deployments for pull requests.
- The included workflow deploys the `./docs` folder. If you prefer `smrbuilders` instead, edit the `directory:` input in the workflow to `./smrbuilders`.
