# Repository Guidelines

## Project Structure

This is a minimal Jekyll portfolio deployed to GitHub Pages at `pedroreis.dev`.

- `index.html` and `en/index.html` are the Portuguese and English homepages.
- `projects.html` and `curriculum.html` have matching English pages under `en/`.
- `_layouts/` contains the shared page shell; `_includes/` contains reusable Liquid components.
- `_data/` holds navigation, translations, services, project metadata, curriculum content, and repository data.
- `assets/css/style.css` contains the design system; `assets/js/` contains small interactive behaviors.
- `docs/` contains supporting documentation. `_site/` is generated output and must not be edited.

## Build and Development

```bash
bundle install
bundle exec jekyll serve   # Run locally at http://localhost:4000
bundle exec jekyll build   # Build the site into _site/
```

There is no test, lint, or typecheck configuration. Run `bundle exec jekyll build` before submitting changes to catch Liquid, YAML, and configuration errors.

## Content and Style

Keep page-specific content in `_data/` where possible and reuse existing includes rather than duplicating markup. Preserve both locale variants when changing user-facing copy; translations live in `_data/translations.yml`. Use two-space indentation in YAML, consistent existing HTML/Liquid formatting, and lowercase kebab-case for new data keys and asset filenames. Prefer edits to `assets/css/style.css` and its existing CSS variables over introducing another styling system.

For current GitHub repository data, use:

```bash
./.github/skills/update-repos-json/scripts/fetch-repos.sh [username]
```

This requires `jq` and `GITHUB_TOKEN` in `.env` or the environment. Never commit `.env` or tokens.

## Commits and Pull Requests

Recent commits use concise imperative subjects, often with prefixes such as `feat:`, `fix:`, and `chore:`. Follow that pattern and keep unrelated changes separate. Pull requests should explain the user-facing or maintenance impact, identify changed routes or data files, and include screenshots for visual changes. Confirm the local Jekyll build succeeds before requesting review.
