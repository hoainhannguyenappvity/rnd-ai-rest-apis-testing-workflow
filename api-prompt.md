# API Prompt

You are given an API test specification in Markdown. Compile `api.md` into a Postman collection JSON file

## Filesystem instructions

- Output file path: `./KMI.postman_collection.json`
- Overwrite existing file

## Character Preservation Rules (MANDATORY)

- Treat all string values as immutable
- Copy values byte-for-byte
- No normalization, no escaping, no encoding
- Preserve Unicode characters exactly

## Mapping Rules

- Each "## API-XXX" section MUST become a Postman folder
- Each "TC-XXX" MUST become a separate Postman request
- The "Request" section defines the base request
- "Request Override" MUST override only the specified fields
- The "Expected Result" section MUST be converted into Postman test scripts

## Output rules

- Write JSON directly to the file
- Do not print JSON to stdout
- Do not include markdown
- Do not include comments
- Do not pause for user input during execution.
- Ensure valid Postman collection JSON structure
