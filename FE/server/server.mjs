import express from 'express';
import multer from 'multer';
import path from 'node:path';
import { existsSync, mkdirSync } from 'node:fs';
import { promises as fs } from 'node:fs';
import { pathToFileURL } from 'node:url';

const app = express();
const port = 3000;
const rootDir = process.cwd();
const configPath = path.resolve(rootDir, 'config/app.config.mjs');
const specsDir = path.resolve(rootDir, 'src/specs');

if (!existsSync(specsDir)) {
  mkdirSync(specsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, specsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, path.basename(file.originalname));
  }
});

const upload = multer({ storage });

app.use(express.json());

const escapeForSingleQuote = (value) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

const updateConfigValue = (content, key, value) => {
  const safeValue = escapeForSingleQuote(value);
  const pattern = new RegExp(`(${key}\\s*:\\s*)'[^']*'`);
  if (!pattern.test(content)) {
    throw new Error(`Cannot update key: ${key}`);
  }

  return content.replace(pattern, `$1'${safeValue}'`);
};

const readConfigModule = async () => {
  const moduleUrl = `${pathToFileURL(configPath).href}?t=${Date.now()}`;
  const module = await import(moduleUrl);
  return module.default;
};

app.get('/api/config', async (_req, res) => {
  try {
    const config = await readConfigModule();
    res.json({
      base_url: config.base_url,
      env: {
        apiUrl: config.env?.apiUrl ?? '',
        username: config.env?.username ?? '',
        password: config.env?.password ?? ''
      },
      apiSpecPathTask: config.apiSpecPathTask ?? ''
    });
  } catch (error) {
    res.status(500).json({ message: `Failed to read config: ${error.message}` });
  }
});

app.put('/api/config/update', async (req, res) => {
  try {
    const { base_url, apiUrl, username, password } = req.body ?? {};
    if (!base_url || !apiUrl || !username || !password) {
      return res.status(400).json({ message: 'base_url, apiUrl, username, password are required.' });
    }

    let content = await fs.readFile(configPath, 'utf8');
    content = updateConfigValue(content, 'base_url', String(base_url));
    content = updateConfigValue(content, 'apiUrl', String(apiUrl));
    content = updateConfigValue(content, 'username', String(username));
    content = updateConfigValue(content, 'password', String(password));

    await fs.writeFile(configPath, content, 'utf8');
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
      await fs.unlink(file.path);
      return res.status(400).json({ message: 'Only .md file is allowed.' });
    }

    const apiSpecPathTask = `./src/specs/${path.basename(file.originalname)}`;
    let content = await fs.readFile(configPath, 'utf8');
    content = updateConfigValue(content, 'apiSpecPathTask', apiSpecPathTask);
    await fs.writeFile(configPath, content, 'utf8');

    return res.json({
      message: 'Task file uploaded and config updated.',
      apiSpecPathTask
    });
  } catch (error) {
    return res.status(500).json({ message: `Failed to upload TASK file: ${error.message}` });
  }
});

app.listen(port, () => {
  console.log(`Workflow API is running at http://localhost:${port}`);
});
