#!/bin/bash
#
# filter-repos.sh
# Filter repositories based on criteria (e.g., exclude private repos, archived, forks)
#
# Usage:
#   ./filter-repos.sh < _data/repos.json > _data/repos-filtered.json
#   cat _data/repos.json | ./filter-repos.sh > _data/repos-filtered.json
#
# This script uses jq to filter the JSON array
# Customize the jq filter below to match your curation preferences
#

# Filter criteria:
# - Exclude private repos (private == false)
# - Exclude archived repos (archived == false)
# - Include all forks (optional: add || .fork == false to exclude forks)
#
# Adjust these conditions as needed for your portfolio

jq '[.[] | select(
  .private == false and
  .archived == false
)]'
