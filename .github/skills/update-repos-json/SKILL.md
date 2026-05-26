---
name: update-repos-json
description: "Automate repos.json updates by fetching fresh repository metadata from GitHub API. Use when refreshing project listings, syncing repository changes, or keeping portfolio data current without manual edits."
argument-hint: "Optional: GitHub username (defaults to barcellos-pedro)"
---

# Automated repos.json Updates

Keep your portfolio project listings in sync with your latest GitHub repositories automatically.

## When to Use

- **Refresh portfolio projects**: Pull the latest metadata from GitHub after creating or updating repositories
- **Sync repository changes**: Update descriptions, topics, or other metadata from GitHub without manual editing
- **Maintain data currency**: Ensure your portfolio always reflects current GitHub profile state
- **Batch project updates**: Regenerate the entire repos listing after major profile changes

## Prerequisites

You need a GitHub personal access token (PAT) to fetch repository data:

1. Go to [GitHub Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)
2. Click **Generate new token (classic)** if you don't have one
3. Select scope: `public_repo` (or `repo` for private repos if desired)
4. Copy the token and keep it secure

## Procedure

### 1. Configure Your Token

**Option A: Using .env file (recommended)**

Create a `.env` file in the project root with your token:

```bash
echo 'GITHUB_TOKEN=ghp_xxxxxxxxxxxx' > .env
```

The script will automatically load it. The `.env` file is in `.gitignore` to keep your token safe. Keep this file local and do not commit it to source control.

**Option B: Using environment variable**

Or set it directly in your shell:

```bash
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"
```

### 2. Run the Fetch Script

Execute the fetch script to pull all repositories and regenerate `_data/repos.json` from the repository root:

```bash
./.github/skills/update-repos-json/scripts/fetch-repos.sh barcellos-pedro
```

Or use the default username (embedded in the script):

```bash
./.github/skills/update-repos-json/scripts/fetch-repos.sh
```

The script will:

- Query the GitHub API for all repositories
- **Automatically exclude private and archived repositories**
- Sort results by updated_at (newest first)
- Write the filtered response to `_data/repos.json`
- Display a summary of public repositories

### 3. Review the Output

Check that `_data/repos.json` was updated and contains your latest repositories:

```bash
head -n 20 _data/repos.json
```

### 4. Verify Against Your Site

- View [projects.html](../../../projects.html) to confirm the projects list displays correctly
- If using Jekyll locally: `bundle exec jekyll serve` and visit `/projects.html`
- Commit changes to git when ready: `git add _data/repos.json && git commit -m "chore: update repos.json from GitHub API"`

## Advanced: Customizing Repository Filtering

By default, the script excludes **private and archived repositories**. To customize which repositories appear in your portfolio:

1. Edit `.github/skills/update-repos-json/scripts/fetch-repos.sh` and modify the jq filter in the "Save to file" section
2. Common customizations:

```bash
# Only show public repos (current default)
jq '[.[] | select(.private == false and .archived == false)]'

# Also exclude forks
jq '[.[] | select(.private == false and .archived == false and .fork == false)]'

# Only show repos with specific topics
jq '[.[] | select(.private == false and (.topics | contains(["typescript"])))]'

# Only show repos with minimum star count
jq '[.[] | select(.private == false and .stargazers_count >= 5)]'
```

See [GitHub API Filtering Guide](./references/github-api-guide.md) for all available fields and filtering options.

### Automated Updates with GitHub Actions

The [GitHub Actions workflow](../../workflows/update-repos.yml) automatically:

- Runs on every push to `main` branch
- Fetches your latest repositories
- **Filters out private and archived repos by default**
- Commits changes if repos have been added/updated

No manual setup needed—the workflow uses your repository's `GITHUB_TOKEN` secret automatically.

## Troubleshooting

| Issue                      | Solution                                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `GITHUB_TOKEN not set`     | Create `.env` file with `echo 'GITHUB_TOKEN=your_token' > .env` or export: `export GITHUB_TOKEN="your_token"` |
| `jq: command not found`    | Install jq: `brew install jq` (macOS) or `apt install jq` (Linux)                                             |
| Empty or truncated results | Check API rate limits: `curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/rate_limit`       |
| Wrong username in results  | Pass the correct username as first argument: `./fetch-repos.sh your-username`                                 |

## Automation Ideas

**Automated updates via GitHub Actions**: The [`.github/workflows/update-repos.yml`](../../workflows/update-repos.yml) workflow automatically:

- **Trigger**: Runs on every push to the `main` branch
- **Token security**: Uses repository secrets (`GITHUB_TOKEN`) instead of hardcoded credentials
- **Filtering**: Automatically excludes private and archived repositories
- **Smart commits**: Only commits changes if repositories have been added/updated
- **Manual trigger**: Can be run manually via GitHub Actions UI

The workflow is production-ready and requires no setup beyond committing the file to your repository.

**Additional automation ideas**:

- **Scheduled updates**: Modify the workflow `on:` section to run on a schedule:
  ```yaml
  schedule:
    - cron: "0 0 * * 0" # Weekly on Sunday
  ```
- **Slack notifications**: Add a step to notify your Slack channel when repos are updated
- **Branch protection**: Require approval before auto-commits merge to `main`

## See Also

- [GitHub API Filtering Guide](./references/github-api-guide.md) — API parameters and filtering options
- [Fetch Script](../../skills/update-repos-json/scripts/fetch-repos.sh) — Implementation and customization
- [Filter Script](../../skills/update-repos-json/scripts/filter-repos.sh) — Customize which repos appear in your portfolio
- [GitHub Actions Workflow](../../workflows/update-repos.yml) — Automated updates on every push to main
