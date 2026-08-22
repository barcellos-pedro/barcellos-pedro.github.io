# pedroreis.dev

A consulting-focused software engineering portfolio built with Jekyll and hosted
on GitHub Pages.

## Features

- Curated homepage work with consulting-focused descriptions
- Full GitHub project archive with search and topic filters
- Services, engagement process, availability, and contact calls to action
- Responsive warm-paper theme with a dark-mode variant

## Structure

```text
├── _data/
│   ├── featured_projects.yml  # Homepage project selection
│   ├── links.yml              # Social links
│   ├── navigation.yml         # Homepage section navigation
│   ├── repos.json             # GitHub project data
│   └── services.yml           # Consulting services
├── _includes/                 # Reusable Jekyll components
├── _layouts/default.html      # Shared page shell and contact footer
├── assets/css/style.css       # Theme and component styles
├── assets/js/script.js        # Terminal reveal and archive filters
├── index.html                 # Homepage
└── projects.html              # Full project archive
```

## Development

```bash
bundle install
bundle exec jekyll serve
```

The site is available at `http://localhost:4000`.

Build the static site with:

```bash
bundle exec jekyll build
```

Generated files are written to `_site/`.

## Content

Projects are sourced from [`_data/repos.json`](_data/repos.json), which is
updated by the GitHub API workflow. Curate the homepage in
[`_data/featured_projects.yml`](_data/featured_projects.yml), and update
services in [`_data/services.yml`](_data/services.yml).

Edit [`_data/navigation.yml`](_data/navigation.yml) to change the homepage
section links. Edit [`_data/links.yml`](_data/links.yml) to update contact and
social links.

## Deployment

The site deploys to GitHub Pages from the `main` branch.

**Website:** [pedroreis.dev](https://pedroreis.dev/)

**GitHub:** [@barcellos-pedro](https://github.com/barcellos-pedro)
