import express from 'express';
import { createTodoService } from '../logic/todos.js';
import * as fileStorage from '../storage/file-storage.js';
import { createApp } from './app.js';

const service = createTodoService(fileStorage);
await service.init();

const app = createApp({ todoService: service });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
