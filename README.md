# Ryan Koh: Portfolio

Personal portfolio site, built with plain HTML, CSS, and JavaScript and hosted free on GitHub Pages.

**Live site:** https://butterx4.github.io

## How it's organized

```
index.html          Home page (hero, about, projects, experience, research, skills, contact)
project.html        One template for every detail page: project.html?id=<entry id>
404.html            Shown for unknown URLs
data/site.js        ALL the content: text, photos, projects, internships  <- edit this
css/style.css       Styles (colors are variables at the top)
js/main.js          Shared nav, footer, lightbox, animations
js/home.js          Builds the home page from data/site.js
js/project.js       Builds detail pages from data/site.js
assets/img/<id>/    Images, one folder per project
assets/docs/        PDFs and other downloads (resume, reports, drawings)
tools/              Helper script to shrink photos
```

You almost never need to touch the HTML or JS. Everything you'd want to change is in **`data/site.js`**.

## Common edits

### Add a photo of yourself to the flipping hero carousel
1. Put the photo in `assets/img/about/` (shrink it first, see below).
2. In `data/site.js`, add a line to `heroPhotos`:
   ```js
   { src: "assets/img/about/hiking.webp", alt: "Ryan hiking in Boulder", position: "50% 30%" },
   ```
   `position` is optional and controls which part of the photo stays in frame.

### Add a project, internship, or personal project
1. Make a folder `assets/img/<new-id>/` and put its images there.
2. In `data/site.js`, copy an existing entry inside `entries` and change it. Key fields:
   - `id`: short, unique, no spaces (becomes the page URL: `project.html?id=<id>`)
   - `section`: `"projects"`, `"experience"`, `"personal"`, or `"research"`
   - `title`, `date`, `summary`, `cover`, `tags`, `awards`, `featured`
   - `company`, `location`, `current: true`: for internships and jobs
   - `link`: makes the card open a file or URL directly instead of a detail page
   - `blocks`: the detail page content, built from these pieces:
     `stats`, `text`, `list`, `image`, `split` (image beside text), `gallery`,
     `table`, `video` (mp4 file or YouTube ID), `docs` (PDF viewer with a file list)
3. Order on the page follows the order in the file.
4. To hide something without deleting it, add `hidden: true`.

### Change the resume
Replace `assets/docs/Ryan_Koh_Resume.pdf` with the new PDF (same file name).

### Change colors or fonts
Edit the variables at the top of `css/style.css`.

## Shrink photos before adding them
Phone photos are several MB each, which makes the site slow. Run:
```
pip install pillow
python tools/optimize_images.py path/to/photo.jpg
```
It writes a small `.webp` next to the original. Use that in `data/site.js`.

## Preview locally
Open `index.html` directly in a browser, or for the most accurate preview run
`python -m http.server` in this folder and visit http://localhost:8000.

## Publishing
GitHub Pages serves the `main` branch automatically (Settings → Pages → Deploy from a branch → `main` / root).
Any commit to `main` goes live within a minute or two.
