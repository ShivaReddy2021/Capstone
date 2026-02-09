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

Notes:
- Alternatively, you can connect Cloudflare Pages directly to GitHub in the Cloudflare dashboard and enable automatic deploys and branch previews without creating the token or action — that is often easier and provides preview deployments for pull requests.
- The included workflow deploys the `./docs` folder. If you prefer `smrbuilders` instead, edit the `directory:` input in the workflow to `./smrbuilders`.
