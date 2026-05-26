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
- **Navigation**: `_data/navigation.yml` defines menu items, but `navigation.html` include is **never rendered** in `default.html`. If you wire it up, add `{% include navigation.html %}` to `_layouts/default.html`.
- **Social links** in `_data/links.yml` — rendered on the homepage via `{% include links.html %}`.
- **Projects** (`projects.html`) read from `_data/repos.json`, which is auto-generated (see below).
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

- `assets/css/simple.css` — classless base with CSS variables (`--bg`, `--accent`, `--text`).
- `assets/css/style.css` — custom component overrides.
- Prefer edits in existing CSS files; avoid new styling systems.
