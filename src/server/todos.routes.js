import express from 'express';
import { sendServiceResult } from './utils/http.js';
import { asyncHandler } from './middleware/async-handler.js';
import {
  validateCreateTodo,
  validateIdParam,
} from './validators/todos.validators.js';

export function createTodosRouter(todoService) {
  const router = express.Router();

  router.get('/', (req, res) => {
    const result = todoService.getAllTodos();
    res.status(200).json({ success: true, result });
  });

  router.post(
    '/',
    validateCreateTodo,
    asyncHandler(async (req, res) => {
      const { name } = req.body;
      const result = await todoService.addTodo(name);
      return sendServiceResult(res, result, { successStatus: 201 });
    }),
  );

  router.patch(
    '/:id',
    validateIdParam,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const result = await todoService.updateTodo(id);
      return sendServiceResult(res, result);
    }),
  );

  router.delete(
    '/:id',
    validateIdParam,
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const result = await todoService.deleteTodo(id);
      return sendServiceResult(res, result);
    }),
  );

  return router;
}
