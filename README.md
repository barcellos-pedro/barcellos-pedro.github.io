# barcellos-pedro.github.io

A personal portfolio and blog website built with Jekyll, showcasing projects and
posts.

## Overview

This is a GitHub Pages-powered static website featuring:

- **Portfolio**: Display of GitHub projects with metadata
- **Blog**: Post listing with chronological organization
- **Responsive Design**: Mobile-friendly layout using CSS Grid
- **Modern Navigation**: Turbo.js for fast, seamless page transitions

## Tech Stack

- **Static Site Generator**: [Jekyll](https://jekyllrb.com/)
- **Styling**: Custom CSS with CSS variables for theming
- **Hosting**: GitHub Pages

## Project Structure

```
├── _data/                 # Data files
│   ├── links.yml         # Social links
│   ├── navigation.yml    # Navigation menu
│   └── repos.json        # GitHub projects
├── _includes/            # Reusable components
│   ├── links.html        # Social links component
│   ├── meta.html         # SEO meta tags
│   ├── navigation.html   # Navigation menu
│   ├── repo.html         # Project card component
│   └── scripts.html      # Script/stylesheet includes
├── _layouts/             # Page layouts
│   ├── default.html      # Base layout
│   └── post.html         # Blog post layout
├── _posts/               # Blog posts (Markdown)
├── assets/               # Static assets
│   ├── css/
│   │   ├── simple.css   # Base styling (classless)
│   │   └── style.css    # Custom styles
│   └── js/
│       └── script.js
├── index.html            # Homepage
├── projects.html         # Projects listing
└── about.md              # About page
```

## Key Features

- **Fast Navigation**: Turbo.js enables smooth page transitions without full
  reloads
- **GitHub Integration**: Automatically displays projects from
  `_data/repos.json`
- **SEO Optimized**: Includes Open Graph and Twitter meta tags
- **Accessible**: Semantic HTML with ARIA support
- **Dark Mode Ready**: CSS variables for easy theme customization

## Setup & Development

### Requirements

- Ruby 2.7+
- Jekyll
- Bundler

### Installation

```bash
bundle install
```

### Local Development

```bash
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`

## Building

```bash
bundle exec jekyll build
```

Static files are generated in the `_site/` directory.

## Content Management

### Adding Projects

Projects are managed via [`_data/repos.json`](_data/repos.json). Each project
includes:

- `name`, `description`, `html_url`
- `created_at`, `topics`

### Adding Blog Posts

Create Markdown files in [`_posts/`](_posts/) with the naming convention:
`YYYY-MM-DD-title.md`

Example:

```markdown
---
layout: post
title: My Post Title
author: Your Name
---

Post content here...
```

### Updating Navigation

Edit [`_data/navigation.yml`](_data/navigation.yml) to customize the navigation
menu.

## Customization

### Colors & Theme

CSS variables in [`assets/css/simple.css`](assets/css/simple.css) control the
color scheme:

```css
:root {
    --bg: #fff;
    --accent: #0d47a1;
    --text: #212121;
    /* more variables... */
}
```

### Custom Styles

Add custom styles in [`assets/css/style.css`](assets/css/style.css) for
component-specific styling.

## Performance

- **Turbo.js**: Reduces page load time by caching snapshots and morphing only
  changed content
- **No dependencies**: Classless CSS framework minimizes styling overhead
- **Static site**: All pages pre-built at deploy time

## Deployment

The site automatically deploys to GitHub Pages on every push to the main branch.

## License

This project is open source and available under the MIT License.

---

**Website**: [pedroreis.dev](https://pedroreis.dev/)\
**GitHub**: [@barcellos-pedro](https://github.com/barcellos-pedro)
