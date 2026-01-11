import express from 'express';
import { createTodosRouter } from './todos.routes.js';

export function createApp({ todoService }) {
  const app = express();

  app.use(express.json());

  app.get('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.use('/todos', createTodosRouter(todoService));

  app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
      success: false,
      reason: 'Internal server error',
    });
  });

  return app;
}
