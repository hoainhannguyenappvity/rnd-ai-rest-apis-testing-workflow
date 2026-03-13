import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const app = express();
const port = 3001;
const serverDir = path.dirname(fileURLToPath(import.meta.url));
const feDir = path.resolve(serverDir, '..');
const repoDir = path.resolve(feDir, '..');
const configPath = path.resolve(repoDir, 'config/app.config.mjs');
const taskFilesDir = path.resolve(repoDir, 'tasks_test_case');
const reportsDir = path.resolve(repoDir, 'reports');

const upload = multer({ storage: multer.memoryStorage() });

app.use(express.json());
app.use('/reports', express.static(reportsDir));

app.get('/', (_req, res) => {
	res.send('Workflow API is running at http://localhost:3001');
});

const sanitizeFileName = (fileName) => path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, '_');

const readConfigModule = async () => {
	const moduleUrl = `${pathToFileURL(configPath).href}?t=${Date.now()}`;
	const module = await import(moduleUrl);
	return module.default ?? {};
};

const cloneConfig = (value) => JSON.parse(JSON.stringify(value ?? {}));

const resolveActiveSelection = (config) => {
	const productMap = config.kmi_product ?? {};
	const productKeys = Object.keys(productMap);
	const selectedProductKey = productKeys.includes(config.selectedProductKey) ? config.selectedProductKey : productKeys[0] ?? '';
	const selectedProduct = selectedProductKey ? productMap[selectedProductKey] : undefined;
	const roleMap = selectedProduct?.roles ?? {};
	const roleKeys = Object.keys(roleMap);
	const selectedRoleKey = roleKeys.includes(config.selectedRoleKey) ? config.selectedRoleKey : roleKeys[0] ?? '';
	const selectedRole = selectedRoleKey ? roleMap[selectedRoleKey] : undefined;

	const base_url = config.base_url ?? selectedProduct?.base_url ?? '';
	const apiUrl = config.env?.apiUrl ?? selectedProduct?.access_token_api ?? '';
	const username = config.env?.username ?? selectedRole?.username ?? '';
	const password = config.env?.password ?? selectedRole?.password ?? '';

	return {
		base_url,
		env: {
			apiUrl,
			username,
			password
		},
		selectedProductKey,
		selectedRoleKey,
		kmi_product: productMap,
		apiSpecPathTask: config.apiSpecPathTask ?? ''
	};
};

const writeConfigModule = async (configObject) => {
	const nextContent = `export default ${JSON.stringify(configObject, null, 4)};\n`;
	await fs.writeFile(configPath, nextContent, 'utf8');
};

app.get('/api/config', async (_req, res) => {
	try {
		const config = await readConfigModule();
		res.json(resolveActiveSelection(config));
	} catch (error) {
		res.status(500).json({ message: `Failed to read config: ${error.message}` });
	}
});

app.put('/api/config/update', async (req, res) => {
	try {
		const { base_url, apiUrl, username, password, apiSpecPathTask, productKey, roleKey } = req.body ?? {};
		if (!base_url || !apiUrl || !username || !password || !apiSpecPathTask) {
			return res.status(400).json({ message: 'base_url, apiUrl, username, password, apiSpecPathTask are required.' });
		}

		const currentConfig = await readConfigModule();
		const nextConfig = cloneConfig(currentConfig);
		nextConfig.base_url = String(base_url);
		nextConfig.env = {
			apiUrl: String(apiUrl),
			username: String(username),
			password: String(password)
		};
		nextConfig.apiSpecPathTask = String(apiSpecPathTask);

		if (!nextConfig.kmi_product || typeof nextConfig.kmi_product !== 'object') {
			nextConfig.kmi_product = {};
		}

		if (productKey && nextConfig.kmi_product[productKey]) {
			nextConfig.selectedProductKey = String(productKey);
			nextConfig.kmi_product[productKey].base_url = String(base_url);
			nextConfig.kmi_product[productKey].access_token_api = String(apiUrl);
			if (!nextConfig.kmi_product[productKey].roles || typeof nextConfig.kmi_product[productKey].roles !== 'object') {
				nextConfig.kmi_product[productKey].roles = {};
			}

			if (roleKey && nextConfig.kmi_product[productKey].roles[roleKey]) {
				nextConfig.selectedRoleKey = String(roleKey);
				nextConfig.kmi_product[productKey].roles[roleKey].username = String(username);
				nextConfig.kmi_product[productKey].roles[roleKey].password = String(password);
			}
		}

		await writeConfigModule(nextConfig);
		return res.json({ message: 'Configuration saved.' });
	} catch (error) {
		return res.status(500).json({ message: `Failed to save config: ${error.message}` });
	}
});

app.post('/api/config/upload-task', upload.single('taskFile'), async (req, res) => {
	try {
		const { file } = req;

		if (!file) {
			return res.status(400).json({ message: 'No file uploaded.' });
		}

		if (!file.originalname.toLowerCase().endsWith('.md')) {
			return res.status(400).json({ message: 'Only .md file is allowed.' });
		}

		const safeFileName = sanitizeFileName(file.originalname);
		const targetPath = path.resolve(taskFilesDir, safeFileName);
		const rootWithSep = `${taskFilesDir}${path.sep}`;
		if (!targetPath.startsWith(rootWithSep)) {
			return res.status(400).json({ message: 'Invalid file path.' });
		}

		await fs.mkdir(taskFilesDir, { recursive: true });
		await fs.writeFile(targetPath, file.buffer);

		const apiSpecPathTask = `./tasks_test_case/${safeFileName}`;

		return res.json({
			message: 'Task file uploaded successfully.',
			apiSpecPathTask
		});
	} catch (error) {
		return res.status(500).json({ message: `Failed to upload TASK file: ${error.message}` });
	}
});

app.get('/api/config/task-files', async (_req, res) => {
	try {
		await fs.mkdir(taskFilesDir, { recursive: true });
		const entries = await fs.readdir(taskFilesDir, { withFileTypes: true });
		const files = entries
			.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith('.md'))
			.map((entry) => ({
				name: entry.name,
				path: `./tasks_test_case/${entry.name}`
			}))
			.sort((a, b) => a.name.localeCompare(b.name));

		return res.json({ files });
	} catch (error) {
		return res.status(500).json({ message: `Failed to list TASK files: ${error.message}` });
	}
});

app.listen(port, () => {
	console.log(`Workflow API is running at http://localhost:${port}`);
});
