import { spawn } from 'node:child_process';

const proc = spawn('node', ['generate-env.mjs'], {
  stdio: 'inherit',
  shell: true,
});

proc.on('close', (code) => {
  console.log('Generator exited:', code);
  process.exit(code);
});

proc.on('error', (err) => {
  console.error('Failed to start generator process:', err);
});
