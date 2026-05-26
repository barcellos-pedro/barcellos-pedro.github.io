# GitHub API Filtering & Customization Guide

This guide covers common GitHub API options for filtering and customizing repository data fetches.

## Basic API Endpoint

```
GET /users/{username}/repos
```

## Common Query Parameters

### Sorting & Direction

```bash
?sort=updated    # Sort by update time (default)
?sort=created    # Sort by creation time
?sort=pushed     # Sort by push time
?sort=stars      # Sort by stargazers count
?sort=name       # Sort alphabetically

?direction=asc   # Ascending order
?direction=desc  # Descending order (default for updated/pushed)
```

### Pagination

```bash
?per_page=100    # Items per page (1-100, default 30)
?page=2          # Page number for results
```

### Filtering by Type

```bash
?type=all        # All repos (default)
?type=owner      # Repos owned by the user
?type=member     # Repos where user is a member
?type=private    # Private repos only
?type=public     # Public repos only
```

## Example Queries

### Fetch latest 50 public repositories (sorted by update time)

```bash
curl -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/users/barcellos-pedro/repos?sort=updated&direction=desc&per_page=50&type=public"
```

### Fetch oldest repositories (sorted by creation)

```bash
curl -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/users/barcellos-pedro/repos?sort=created&direction=asc&per_page=100"
```

### Fetch most starred repositories

```bash
curl -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/users/barcellos-pedro/repos?sort=stars&direction=desc&per_page=100"
```

## Filtering JSON Results with jq

After fetching, use `jq` to filter results:

### Exclude archived repositories

```bash
cat _data/repos.json | jq '[.[] | select(.archived == false)]' > filtered.json
```

### Include only repositories with specific topics

```bash
cat _data/repos.json | jq '[.[] | select(.topics | contains(["typescript"]))]'
```

### Sort by stars within a language

```bash
cat _data/repos.json | jq 'sort_by(.stargazers_count) | reverse | .[]' \
  | jq 'select(.language == "TypeScript")'
```

### Extract minimal fields (name, description, URL)

```bash
cat _data/repos.json | jq '.[] | {name, description, html_url}'
```

### Remove sensitive fields (keep only public metadata)

```bash
cat _data/repos.json | jq '[.[] | del(.owner, .permissions, .security_and_analysis)]'
```

## Rate Limiting

GitHub API allows:

- **60 requests/hour** (unauthenticated)
- **5000 requests/hour** (authenticated with token)

Check your rate limit:

```bash
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/rate_limit | jq '.rate_limit'
```

## Response Fields Reference

Common fields returned for each repository:

| Field               | Description            |
| ------------------- | ---------------------- |
| `id`                | Repository ID          |
| `name`              | Repository name        |
| `full_name`         | Owner/repo name        |
| `description`       | Repository description |
| `url`               | API URL                |
| `html_url`          | GitHub web URL         |
| `homepage`          | Project homepage       |
| `language`          | Primary language       |
| `topics`            | Array of topic tags    |
| `stargazers_count`  | Star count             |
| `watchers_count`    | Watch count            |
| `forks_count`       | Fork count             |
| `open_issues_count` | Open issues            |
| `created_at`        | Creation timestamp     |
| `updated_at`        | Last update timestamp  |
| `pushed_at`         | Last push timestamp    |
| `archived`          | Boolean: is archived   |
| `private`           | Boolean: is private    |
| `fork`              | Boolean: is a fork     |

## Helpful Resources

- [GitHub REST API - List repositories](https://docs.github.com/en/rest/repos/repos?apiVersion=2022-11-28#list-repositories-for-a-user)
- [jq Manual](https://stedolan.github.io/jq/manual/)
- [GitHub GraphQL API](https://docs.github.com/en/graphql) (alternative to REST API)
