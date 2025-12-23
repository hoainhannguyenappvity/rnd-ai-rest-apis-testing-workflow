# n8n

## Installation

Install **n8n** via npm

```bash
npm i -g n8n
```

## start

Run below command in **Command Prompt**

```bash
set NODES_EXCLUDE="[]" && set NODE_FUNCTION_ALLOW_EXTERNAL=uuid && set N8N_RESTRICT_FILE_ACCESS_TO="./" && n8n
```

Run below command in **Windows PowerShell**

```bash
$env:NODES_EXCLUDE = "[]"; $env:NODE_FUNCTION_ALLOW_EXTERNAL = "uuid"; $env:N8N_RESTRICT_FILE_ACCESS_TO = "./" ; $env:N8N_BLOCK_FILE_ACCESS_TO_N8N_FILES = "false"; n8n
```

## Import workflow

Import **AI REST APIs Testing Workflow.json** file to your n8n workflows
