# AGENTS.md

Jekyll static site for personal portfolio and blog.

## Dev Commands

```bash
bundle install          # Install dependencies
bundle exec jekyll serve  # Dev server at http://localhost:4000
bundle exec jekyll build  # Build to _site/
```

## Content

- **Projects**: Edit `_data/repos.json` (manually synced from GitHub API)
- **Blog posts**: Add Markdown files to `_posts/` with format `YYYY-MM-DD-title.md`
- **Navigation**: Edit `_data/navigation.yml`

## Theming

- Base styles: `assets/css/simple.css` (CSS variables for colors)
- Custom styles: `assets/css/style.css`

## Deployment

Pushes to `main` automatically deploy to GitHub Pages.

## Notes

- No tests, linting, or typechecking
- Build output in `_site/` is gitignored
- Uses Turbo.js for fast page transitions