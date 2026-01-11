import request from 'supertest';
import { createApp } from '../../src/server/app.js';
import { createTodoService } from '../../src/logic/todos.js';
import { createMemoryStorage } from '../../src/storage/memory-storage.js';

function buildTestApp() {
  const storage = createMemoryStorage();
  const service = createTodoService(storage);
  const app = createApp({ todoService: service });
  return { app, service };
}

describe('Todos API (Supertest)', () => {
  test('GET /health returns OK', async () => {
    const { app } = buildTestApp();
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.text).toBe('OK');
  });
});
