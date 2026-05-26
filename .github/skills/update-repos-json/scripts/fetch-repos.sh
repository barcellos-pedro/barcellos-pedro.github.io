#!/bin/bash
#
# fetch-repos.sh
# Fetch all repositories from a GitHub user account and save to _data/repos.json
#
# Usage:
#   ./fetch-repos.sh [USERNAME]
#   ./fetch-repos.sh barcellos-pedro
#   ./fetch-repos.sh                    # Uses default: barcellos-pedro
#
# Requirements:
#   - jq (JSON query tool)
#   - GITHUB_TOKEN in .env file or environment variable
#

set -e

# Configuration
USERNAME="${1:-barcellos-pedro}"
OUTPUT_FILE="_data/repos.json"
API_URL="https://api.github.com/users/${USERNAME}/repos"

# Load .env file if it exists
if [ -f .env ]; then
    set -a
    source .env
    set +a
fi

# Check prerequisites
if ! command -v jq &> /dev/null; then
    echo "❌ Error: jq is not installed"
    echo "   Install with: brew install jq (macOS) or apt install jq (Linux)"
    exit 1
fi

if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ Error: GITHUB_TOKEN is not set"
    echo "   Option 1: Create .env file with: echo 'GITHUB_TOKEN=your_token' > .env"
    echo "   Option 2: Export as env var: export GITHUB_TOKEN='your_token'"
    exit 1
fi

echo "📦 Fetching repositories for @${USERNAME}..."
echo "   API: ${API_URL}"

# Fetch all repos (pagination handled by API, default 30 per page, max 100)
# Sorting by updated_at to get recently modified repos first
RESPONSE=$(curl -s -H "Authorization: token ${GITHUB_TOKEN}" \
    -H "Accept: application/vnd.github.v3+json" \
    "${API_URL}?sort=updated&direction=desc&per_page=100")

# Check for API errors
if echo "$RESPONSE" | jq -e '.message' > /dev/null 2>&1; then
    ERROR_MSG=$(echo "$RESPONSE" | jq -r '.message')
    echo "❌ API Error: ${ERROR_MSG}"
    exit 1
fi

# Save to file, filtering out private and archived repos by default
echo "$RESPONSE" | jq '[.[] | select(.private == false and .archived == false)]' > "$OUTPUT_FILE"

# Display summary
FILTERED_COUNT=$(echo "$RESPONSE" | jq '[.[] | select(.private == false and .archived == false)] | length')
TOTAL_COUNT=$(echo "$RESPONSE" | jq 'length')
FILTERED_OUT=$((TOTAL_COUNT - FILTERED_COUNT))
echo "✅ Successfully fetched ${FILTERED_COUNT} public repositories (${FILTERED_OUT} private/archived excluded)"
echo "📝 Written to: ${OUTPUT_FILE}"
echo ""
echo "Repository list:"
echo "$RESPONSE" | jq '[.[] | select(.private == false and .archived == false)] | .[] | "  - \(.name) (\(.stargazers_count) ⭐)"' | head -10

echo ""
echo "📋 Next steps:"
echo "   1. Review the updated ${OUTPUT_FILE}"
echo "   2. Run: bundle exec jekyll serve"
echo "   3. Visit: http://localhost:4000/projects.html"
echo "   4. Commit: git add ${OUTPUT_FILE} && git commit -m 'chore: update repos.json from GitHub API'"
