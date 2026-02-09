# SMRbuilders — Static Website

This folder contains a small static website for the SMRbuilders construction project. It's intentionally minimal so you can open it locally or publish to GitHub Pages.

Files:
- `index.html` — homepage
- `about.html` — about and values
- `projects.html` — projects list
- `contact.html` — contact form (static)
- `css/style.css` — styles
- `js/main.js` — small JS (mobile nav + footer year)
- `assets/logo.svg` — site logo

How to view locally:

1. Open `index.html` in a browser (double-click or drag into a browser window).
2. For a local static server (recommended) you can run a simple python server from this folder:

```powershell
# from Windows PowerShell, run in the smrbuilders folder
python -m http.server 8000
# then open http://localhost:8000 in your browser
```
 
 Alternative servers (no Python required)
 
 - PowerShell (no extra installs): from the repository root run the included script:
 
 ```powershell
 # from repo root
 ./tools/serve.ps1 -Root .\smrbuilders -Port 8000
 # then open http://localhost:8000
 ```
 
 - Node.js (if you have Node): run the simple server script included in `tools/`:
 
 ```powershell
 # from repo root
 node tools/static-server.js smrbuilders 8000
 # open http://localhost:8000
 ```

Deploy to GitHub Pages:

1. Commit the `smrbuilders` folder to your repository.
2. On GitHub, you can enable Pages from the repository settings — choose the branch (e.g., `main`) and the `/smrbuilders` folder (or `docs` if you move there).

Wire the contact form (Formspree)
- This site includes a contact form in `contact.html` that posts to Formspree. To connect it:
	1. Create a free form at https://formspree.io and register your form. Formspree will provide an endpoint like `https://formspree.io/f/abc123`.
	2. Edit `contact.html` and replace `{your_form_id}` in the `action` attribute with your form ID (e.g. `/f/abc123`).
	3. Optionally set a `_next` hidden input to redirect to a thank-you page after submit.

I also added two placeholder project images in `assets/sample1.svg` and `assets/sample2.svg`. Replace them with real project photos if you have them.

Deploy from `docs/` (recommended for GitHub Pages)
- I can copy the site into a `docs/` folder so GitHub Pages serves it directly from the repository root. If you prefer that, push the `docs/` folder to your `main` branch and enable Pages from `main`/`/docs` in repository settings.

Customizations you might want next:
- Replace placeholder images with real project photos (`assets/`)
- Add real contact handling (Netlify Forms, Formspree, or your backend)
- Improve accessibility and run an a11y audit
