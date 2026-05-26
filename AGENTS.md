# AGENTS.md

A Jekyll-based personal portfolio and blog website deployed to GitHub Pages.

## Purpose

This repo is a static site. Keep changes aligned with the existing Jekyll structure, content patterns, and styling conventions.

## Dev Commands

```bash
bundle install          # Install dependencies
bundle exec jekyll serve  # Dev server at http://localhost:4000
bundle exec jekyll build  # Build to _site/
```

## Key Files

- `_data/repos.json` — project metadata shown on `projects.html`
- `_posts/` — blog posts in `YYYY-MM-DD-title.md` format with front matter
- `_data/navigation.yml` — top navigation menu
- `_layouts/` and `_includes/` — page templates and reusable components
- `assets/css/simple.css` — base styling and CSS variables
- `assets/css/style.css` — custom site styles
- `index.html`, `projects.html`, `about.md` — primary pages

## Agent guidance

- Preserve the current static site approach; avoid adding new build systems or JS frameworks.
- Use Jekyll front matter and existing layouts for new pages and posts.
- Do not modify generated output in `_site/`.
- Keep content concise, readable, and consistent with the site tone.
- Prefer edits within existing files and data-driven content over introducing duplicate structures.
- Keep styling changes small and use existing CSS files rather than creating new styling systems.

## Deployment and notes

- The site deploys automatically from `main` to GitHub Pages.
- `_site/` is generated and gitignored.
- No tests, linting, or typechecking are present in this repo.
- Uses Turbo.js for fast page transitions.
