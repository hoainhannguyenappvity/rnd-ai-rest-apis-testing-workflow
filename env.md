# Environment Variables (Source)

This file is the single source of truth for environment variables.
You MUST generate a Postman environment JSON from this file.

Generation rules:

- One Postman environment per Environment section.
- Each variable becomes a Postman "values" entry.

---

## Environment

- id: `qa`
- name: `API Testing - QA`

### base_url

- key: base_url
- value: `http://numservice-qa.appvity.com`
- type: text
- enabled: true
- description: Base URL for API requests
