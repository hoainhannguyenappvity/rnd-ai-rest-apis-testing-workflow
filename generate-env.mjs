import { readFileSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import config from './config/app.config.mjs';

const envMdPath = config.envMdPath;
const authPath = config.authPath;
const outputPath = config.postmanEnvironmentOutput;

try {
	const envMd = readFileSync(envMdPath, 'utf8');
	const authSrc = readFileSync(authPath, 'utf8');

	const envMeta = parseEnvironmentMeta(envMd);
	const valuesFromEnv = parseEnvVariables(envMd);
	const valuesFromAuth = parseAuthValues(authSrc);

	const mergedValues = mergeValues(valuesFromEnv, valuesFromAuth);

	const environment = {
		id: envMeta.id || randomUUID(),
		name: envMeta.name || 'KMI Automation Environment',
		values: mergedValues.map((v) => ({
			key: v.key,
			value: v.value,
			enabled: v.enabled !== undefined ? v.enabled : true
		})),
		schema: 'https://schema.getpostman.com/json/collection/v2.1.0/environment.json'
	};

	writeFileSync(outputPath, JSON.stringify(environment, null, 2), 'utf8');
	console.log(`✓ Created: ${outputPath} with ${environment.values.length} variables`);
} catch (error) {
	console.error('Error:', error.message);
	process.exit(1);
}

function parseEnvironmentMeta(content) {
	const idMatch = content.match(/- id:\s*`([^`]+)`/i);
	const nameMatch = content.match(/- name:\s*`([^`]+)`/i);
	return {
		id: idMatch ? idMatch[1] : null,
		name: nameMatch ? nameMatch[1] : null
	};
}

function parseEnvVariables(content) {
	const vars = [];
	const sections = content.split(/(?=###\s+)/);

	sections.forEach((section) => {
		if (!section.trim().startsWith('### ')) return;

		const keyMatch = section.match(/- key:\s*([^\n]+)/i);
		const valueMatch = section.match(/- value:\s*`([^`]+)`/i);
		const enabledMatch = section.match(/- enabled:\s*(true|false)/i);

		if (!keyMatch) return;

		const key = keyMatch[1].trim();
		let value = valueMatch ? valueMatch[1] : '';
		const enabled = enabledMatch ? enabledMatch[1].toLowerCase() === 'true' : true;

		if (isPlaceholder(value, key)) {
			value = defaultSecretPlaceholder(key, value);
		}

		vars.push({ key, value, enabled });
	});

	return vars;
}

function parseAuthValues(source) {
	const values = [];

	const apiUrl = matchStringConst(source, 'apiUrl');
	if (apiUrl) values.push({ key: 'apiUrl', value: apiUrl, enabled: true });

	const username = matchStringConst(source, 'username');
	if (username) values.push({ key: 'username', value: username, enabled: true });

	const password = matchStringConst(source, 'password');
	if (password) values.push({ key: 'password', value: password, enabled: true });

	const clientId = matchStringLiteral(source, /client_id:\s*'([^']+)'/);
	if (clientId) values.push({ key: 'client_id', value: clientId, enabled: true });

	const grantType = matchStringLiteral(source, /grant_type:\s*'([^']+)'/);
	if (grantType) values.push({ key: 'grant_type', value: grantType, enabled: true });

	const scope = matchStringLiteral(source, /scope:\s*'([^']+)'/);
	if (scope) values.push({ key: 'scope', value: scope, enabled: true });

	return values;
}

function mergeValues(baseValues, overrideValues) {
	const merged = new Map();

	baseValues.forEach((v) => merged.set(v.key, { ...v }));
	overrideValues.forEach((v) => merged.set(v.key, { ...v }));

	return Array.from(merged.values());
}

function matchStringConst(source, constName) {
	const re = new RegExp(`const\\s+${constName}\\s*=\\s*'([^']+)'`);
	const match = source.match(re);
	return match ? match[1] : null;
}

function matchStringLiteral(source, re) {
	const match = source.match(re);
	return match ? match[1] : null;
}

function isPlaceholder(value, key) {
	if (!value) return true;
	if (/__REPLACE_ME__/i.test(value)) return true;
	if (/<[^>]+>/.test(value)) return true;
	if (/your[_\s-]*\w+/i.test(value)) return true;
	if (/placeholder/i.test(value)) return true;
	if (/token|secret|password|api[_-]?key/i.test(key) && /<|your|replace|changeme/i.test(value)) return true;
	return false;
}

function defaultSecretPlaceholder(key, value) {
	if (/^Bearer\s+/i.test(value)) return 'Bearer __REPLACE_ME__';
	if (/token/i.test(key)) return '__REPLACE_ME__';
	if (/secret|password|api[_-]?key/i.test(key)) return '__REPLACE_ME__';
	return value || '__REPLACE_ME__';
}
