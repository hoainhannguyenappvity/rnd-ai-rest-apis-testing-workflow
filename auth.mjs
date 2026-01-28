import { readFile, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const apiUrl = 'https://ltplusapi.360awareqa.com/idsrv/connect/token';
const username = 'lelinhtrang17999@gmail.com';
const password = 'P@ssword170999';

function findProjectRoot(startDir) {
	let current = startDir;
	for (let i = 0; i < 6; i += 1) {
		if (existsSync(join(current, 'AGENTS.md'))) return current;
		const parent = dirname(current);
		if (parent === current) break;
		current = parent;
	}
	return null;
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const rootFromCwd = findProjectRoot(process.cwd());
const rootFromScript = findProjectRoot(scriptDir);
const projectRoot = rootFromCwd || rootFromScript || process.cwd();
const envPath = join(projectRoot, 'KMI.postman_environment.json');

async function getAuthToken(username, password) {
	const body = new URLSearchParams({
		grant_type: 'password',
		client_id: 'js',
		username: username,
		password: password,
		scope: 'openid profile offline_access',
	});

	return fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body,
	});
}

const auth = await getAuthToken(username, password);
const authData = await auth.json();
console.log('Received access token:', authData.access_token);

if (!existsSync(envPath)) {
	console.error(`Missing environment file: ${envPath}`);
	console.error('Run env.mjs first to generate KMI.postman_environment.json.');
	process.exit(1);
}

// Strip BOM when reading
const fileContent = await readFile(envPath, 'utf8');
const env = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

env.values.find((v) => v.key === 'auth_token').value = `Bearer ${authData.access_token}`;
console.log('Updated auth_token in KMI.postman_environment.json file.');

await writeFile(envPath, JSON.stringify(env, null, 2), 'utf8');
console.log('KMI.postman_environment.json file updated successfully!');
