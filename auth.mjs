import { readFile, writeFile } from 'fs/promises';

const apiUrl = 'https://autotesting.360awareqa.com/idsrv/connect/token';
const username = 'ptanh.iuh@gmail.com';
const password = 'P@ssword$2025!';

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

// Strip BOM when reading
const fileContent = await readFile('./KMI.postman_environment.json', 'utf8');
const env = JSON.parse(fileContent.replace(/^\uFEFF/, ''));

env.values.find((v) => v.key === 'auth_token').value = `Bearer ${authData.access_token}`;
console.log('Updated auth_token in KMI.postman_environment.json file.');

await writeFile('./KMI.postman_environment.json', JSON.stringify(env, null, 2), 'utf8');
console.log('KMI.postman_environment.json file updated successfully!');