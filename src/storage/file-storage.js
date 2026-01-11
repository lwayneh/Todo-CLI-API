import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to data directory
const dataDir = path.join(__dirname, '..', 'data');
// Path to JSON file
const dataPath = path.join(dataDir, 'todo.json');

// Read the JSON file, parse it, and return actual JS objects/arrays
export async function loadTodos() {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    const dataJson = JSON.parse(data);
    return [dataJson.nextId ?? 1, dataJson.todos ?? []];
  } catch (error) {
    if (error.code === 'ENOENT') return [1, []]; // first run: no file yet
    throw error; // anything else is a real problem
  }
}

// Write to the JSON file when changes happen
export async function saveTodos(nextId, todos) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dataPath, JSON.stringify({ nextId, todos }, null, 2));
}
