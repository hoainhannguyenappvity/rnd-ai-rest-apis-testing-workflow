# API Prompt

You are given an environment test specification in Markdown. Compile `./api.md` into a Postman collection JSON file

## Step 1: Preconditions

- Check that `./api.md` exists. If missing, stop and print a clear error to stderr, then exit with non-zero status.
- Do NOT ask for user input or wait for confirmation.

## Step 2: Parse and Convert

Convert the API test specification in `./api.md` into a valid Postman collection JSON file.

## Mapping Rules (Strict)

- Each section with heading `## API-XXX: ...` becomes a Postman folder.
- The `### Request { ... }` section defines the base request for all test cases in that folder.
- Each `TC-XXX` row in the Test Cases table becomes a separate Postman request.
- "Request Override" modifies ONLY the specified fields (method, headers, body). Unspecified fields must inherit from the base request.
- The "Expected Result" text must be converted into Postman test scripts for that request.

## Output Requirements (Must Pass)

- Write the JSON directly to `./KMI.postman_collection.json` (overwrite if exists).
- Ensure the JSON is valid and includes:
  - `info` with `name` and `schema`
  - `item` array for folders and requests
  - `request` and `event` (test scripts) for each test case
- Do NOT print JSON to stdout.
- Do NOT include markdown, code fences, or commentary in output.
- Exit with code 0 ONLY if the file was created successfully.

## Reliability Guardrails

- After writing the file, re-open and parse it to confirm valid JSON and that `item.length > 0`.
- If validation fails, write a concise error to stderr and exit with non-zero status.

## Character Preservation Rules (MANDATORY)

- Treat all string values as immutable.
- Copy values byte-for-byte.
- No normalization, no escaping, no encoding.
- Preserve Unicode characters exactly.
