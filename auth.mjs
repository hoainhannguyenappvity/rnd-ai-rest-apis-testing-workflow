import { readFile, writeFile } from 'fs/promises';

const apiUrl = 'https://qaweb360plus.360awareqa.com/idsrv/connect/token';

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

const auth = await getAuthToken('nhannguyen@appvity.com', 'P@ssw0rd');
const authData = await auth.json();
console.log('Received access token:', authData.access_token);

const env = JSON.parse(await readFile('./KMI.postman_environment.json', 'utf8'));
env.values.find((v) => v.key === 'auth_token').value = 'Bearer ' + authData.access_token;
console.log('Updated auth_token in KMI.postman_environment.json file.');

await writeFile('./KMI.postman_environment.json', JSON.stringify(env, null, 2), 'utf8');
console.log('KMI.postman_environment.json file updated successfully!');
