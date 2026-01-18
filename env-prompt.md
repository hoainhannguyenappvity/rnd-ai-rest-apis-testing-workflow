# Environment Prompt

You are given an environment test specification in Markdown. Compile `./env.md` into a Postman environment JSON file

## Filesystem instructions

- Output file path: `./eProduct.postman_environment.json`
- Overwrite existing file

## Character Preservation Rules (MANDATORY)

- Treat all string values as immutable
- Copy values byte-for-byte
- No normalization, no escaping, no encoding
- Preserve Unicode characters exactly

## Output rules

- Write JSON directly to the file
- Do not print JSON to stdout
- Do not include markdown
- Do not include comments
- Do not pause for user input during execution.
- Ensure valid Postman environment JSON structure
