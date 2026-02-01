import { readFileSync, writeFileSync } from 'fs';
import { randomUUID } from 'crypto';

const envMdPath = './env.md';

const outputPath = './eProduct.postman_environment.json';

try {
	const envMd = readFileSync(envMdPath, 'utf8');

	const envMeta = parseEnvironmentMeta(envMd);
	const valuesFromEnv = parseEnvVariables(envMd);

	const mergedValues = mergeValues(valuesFromEnv);

	const environment = {
		id: envMeta.id || randomUUID(),
		name: envMeta.name || 'Automation Environment',
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

		const headingMatch = section.match(/^###\s+(.+)$/m);
		const keyMatch = section.match(/- key:\s*([^\n]+)/i);
		const valueMatch =
			section.match(/- value:\s*`([^`]+)`/i) ||
			section.match(/- value:\s*([^\n]+)/i);
		const enabledMatch = section.match(/- enabled:\s*(true|false)/i);

		const headingKey = headingMatch ? headingMatch[1].trim() : '';
		let key = keyMatch ? keyMatch[1].trim() : headingKey;

		if (!key) return;
		if (headingKey.toLowerCase() === 'base_url' && key !== 'base_url') {
			key = 'base_url';
		}

		let value = valueMatch ? valueMatch[1].trim() : '';
		const enabled = enabledMatch ? enabledMatch[1].toLowerCase() === 'true' : true;

		if (isPlaceholder(value, key)) {
			value = defaultSecretPlaceholder(key, value);
		}

		vars.push({ key, value, enabled });
	});

	return vars;
}

function mergeValues(baseValues = [], overrideValues = []) {
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
