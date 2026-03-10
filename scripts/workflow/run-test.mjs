import { spawn } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const promptPath = resolve(__dirname, '../../run-test-prompt.md');

const proc = spawn('npx', ['codex', 'exec', '--sandbox=danger-full-access', '--json', promptPath], {
  stdio: 'inherit',
  shell: true,
});

proc.on('close', (code) => {
  console.log('Codex exited:', code);
  process.exit(code);
});

proc.on('error', (err) => {
  console.error('Failed to start codex process:', err);
});
