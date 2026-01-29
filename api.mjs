import { spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';

const apiSpecPath = './swagger/api.md';
const outputPath = './eProduct.postman_collection.json';

if (!existsSync(apiSpecPath)) {
  console.error(`Missing required file: ${apiSpecPath}`);
  process.exit(1);
}

const proc = spawn('node', ['generate-postman.mjs'], {
  stdio: 'inherit',
  shell: true,
});

proc.on('close', (code) => {
  if (code !== 0) {
    console.error('Generator exited with non-zero status:', code);
    process.exit(code);
  }

  if (!existsSync(outputPath)) {
    console.error(`Output file not found: ${outputPath}`);
    process.exit(1);
  }

  try {
    const content = readFileSync(outputPath, 'utf8');
    const json = JSON.parse(content);
    if (!json || !Array.isArray(json.item) || json.item.length === 0) {
      throw new Error('Invalid Postman collection structure or empty items');
    }
    console.log('✓ Postman collection generated successfully');
  } catch (err) {
    console.error('Output validation failed:', err?.message ?? err);
    process.exit(1);
  }

  process.exit(0);
});