import { spawn } from 'child_process';

const proc = spawn('npx', ['codex', 'exec', 'prompt.md', '--sandbox=danger-full-access'], {
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
