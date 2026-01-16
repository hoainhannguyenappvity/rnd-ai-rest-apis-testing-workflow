# API Prompt

## Step 1: Read Input File

- First, read and parse the file: `./api.md`
- Verify the file exists before proceeding
- If file not found, ask user for the correct path

## Step 2: Parse and Convert

You will convert the API test specification from api.md into a Postman collection JSON file.

## Mapping Rules

- Each "## API-XXX" section MUST become a Postman folder
- Each "TC-XXX" MUST become a separate Postman request
- The "Request" section defines the base request
- "Request Override" MUST override only the specified fields
- The "Expected Result" section MUST be converted into Postman test scripts

## Character Preservation Rules (MANDATORY)

- Treat all string values as immutable
- Copy values byte-for-byte
- No normalization, no escaping, no encoding
- Preserve Unicode characters exactly

## Output Requirements

- Output file path: `./KMI.postman_collection.json`
- Overwrite existing file if present
- Write valid Postman collection JSON structure
- Do NOT print JSON to stdout
- Do NOT include markdown code blocks or comments
- Execute automatically without pausing for user input
