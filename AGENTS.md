# AGENTS.md

A Jekyll-based personal portfolio and blog on GitHub Pages at `pedroreis.dev`.

## Dev Commands

```bash
bundle install              # Install deps
bundle exec jekyll serve    # Dev server at http://localhost:4000
bundle exec jekyll build    # Build to _site/
```

No tests, linting, or typechecking.

## Architecture

- **Minimal Jekyll**: only plugin is `jekyll-sitemap`; `_config.yml` sets just `url`.
- **Custom domain**: `CNAME` file at root points to `pedroreis.dev`.
- **Gemfile.lock is gitignored** — unusual; commit it if you need reproducible builds.
- **Navigation**: Top nav bar (`_includes/navigation.html`) is rendered in `_layouts/default.html` via `{% include navigation.html %}`. Menu items come from `_data/navigation.yml`. Active state uses exact URL match except for Blog, which highlights on any `/blog/...` path.
- **Social links** in `_data/links.yml` — rendered on the homepage as pill buttons with inline SVG icons via `{% include links.html %}`.
- **Projects**: `index.html` shows 6 featured projects from `_data/repos.json`; `/projects.html` shows the full list.
- **`assets/js/script.js`** is a single `console.log("Welcome!")` — purely decorative.
- **`_site/`** is generated and gitignored — never edit directly.

## repos.json Automation

`_data/repos.json` is populated from the GitHub API:

- **Manual**: `./.github/skills/update-repos-json/scripts/fetch-repos.sh [username]` (requires `jq` + `GITHUB_TOKEN` in `.env`).
- **Auto**: `.github/workflows/update-repos.yml` runs on every push to `main` and commits changes if repos changed.
- Private and archived repos are filtered out by default.

## Content

- **Posts**: `_posts/YYYY-MM-DD-title.md` with front matter `layout: post`, `title`, `author`.
- **Projects**: edit `_data/repos.json` or re-run the fetch script.
- **Navigation**: edit `_data/navigation.yml` (then wire it into a layout if you want it visible).

## Styling

- `assets/css/style.css` — full custom design system with CSS variables for light and dark mode (`--bg`, `--surface`, `--accent`, `--text`).
- Inter font loaded via Google Fonts.
- Responsive breakpoints at 900px (2-col grid) and 640px (single column / stacked hero).
- Prefer edits in `style.css`; avoid new styling systems.
