# pedroreis.dev

A bilingual consulting-focused software engineering portfolio built with Jekyll and hosted on GitHub Pages.

## What is included

- Portuguese and English homepages, project archives, and curriculum pages
- Curated featured work plus a searchable GitHub repository archive
- Consulting services, engagement process, availability, and contact calls to action
- Responsive warm-paper visual system with a dark-mode variant

## Structure

```text
_data/                  Content, translations, navigation, and repository metadata
_includes/              Shared Liquid components
_layouts/default.html   Shared page shell and footer
assets/css/style.css    Theme and component styles
assets/js/              Archive filtering and terminal/scroll interactions
docs/                   Supporting documentation
index.html              Portuguese homepage
en/                     English page variants
projects.html           Portuguese project archive
curriculum.html         Portuguese curriculum page
```

## Local development

```bash
bundle install
bundle exec jekyll serve
```

Open `http://localhost:4000`. To validate a production build:

```bash
bundle exec jekyll build
```

The generated site is written to `_site/`; do not edit that directory directly.

## Updating content

Edit [`_data/featured_projects.yml`](_data/featured_projects.yml) for homepage projects, [`_data/services.yml`](_data/services.yml) for services, and [`_data/project_metadata.yml`](_data/project_metadata.yml) for archive categories. Update translations in [`_data/translations.yml`](_data/translations.yml), navigation in [`_data/navigation.yml`](_data/navigation.yml), and contact links in [`_data/links.yml`](_data/links.yml).

Repository data can be refreshed from GitHub with:

```bash
./.github/skills/update-repos-json/scripts/fetch-repos.sh barcellos-pedro
```

The script requires `jq` and a `GITHUB_TOKEN` stored in `.env` or the environment. A GitHub Actions workflow also refreshes `_data/repos.json` after pushes to `main`.

## Deployment

The site is deployed from `main` to GitHub Pages. The custom domain is declared in [`CNAME`](CNAME).

- Website: [pedroreis.dev](https://pedroreis.dev/)
- GitHub: [@barcellos-pedro](https://github.com/barcellos-pedro)
