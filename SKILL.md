# Skill: Update project metadata and repo listings

This skill helps the agent safely update the site’s project catalog by editing `_data/repos.json` and keeping the rendered project listings in sync.

## When to use

- Add a new portfolio project entry
- Update an existing project’s description, URL, or displayed metadata
- Fix typos or update topics for projects shown on `projects.html`

## What this skill does

1. Review the current project data in `_data/repos.json`.
2. Keep the file as a valid JSON array of repository objects.
3. Add or update only the necessary fields for the project entry.
4. Preserve the existing object structure and avoid reformatting unrelated entries.
5. Keep `projects.html` and `_includes/repo.html` unchanged unless the request explicitly asks for layout updates.
6. Do not modify generated output under `_site/`.

## Data guidance

- Use `name`, `full_name`, `html_url`, `description`, and optionally `topics` for display.
- Preserve repository metadata like `id`, `created_at`, and relevant GitHub fields when available.
- If adding a project manually, keep the object shape consistent with existing entries.
- Avoid introducing new custom fields unless the request explicitly requires them.

## Quality checks

- Ensure `_data/repos.json` remains valid JSON.
- Keep output concise and aligned with the existing portfolio/blog tone.
- Do not change the site structure or add new build tooling.
- Prefer updating project metadata over creating new presentation components.

## Example prompts

- "Add a new project entry for `example-project` with a description, GitHub URL, and topics `blog` and `portfolio`."
- "Update the description for the `transfer-web-api` project in `_data/repos.json`."
- "Keep the current project listing layout, but fix the `html_url` for one repo entry."
