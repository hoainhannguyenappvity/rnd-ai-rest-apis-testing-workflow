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
- value: `https://autotesting.360awareqa.com`
- type: text
- enabled: true
- description: Base URL for API requests

### auth_token

- key: auth_token
- value: `Bearer <YOUR_AUTH_TOKEN_HERE>`
- type: text
- enabled: true
- description: Authentication token for API requests
