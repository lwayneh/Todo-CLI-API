import { describe, it, expect } from '@jest/globals';

import { createTodoService } from './todos.js';
import { createMemoryStorage } from '../storage/memory-storage.js';

describe('Todos service', () => {
  it('adds a todo', async () => {
    const storage = createMemoryStorage();
    const service = createTodoService(storage);
    await service.init();

    const result = await service.addTodo('Buy milk');

    expect(result.success).toBe(true);
    expect(result.todo.name).toBe('Buy milk');
    expect(service.getAllTodos()).toHaveLength(1);
    expect(service.getAllTodos()[0].name).toBe('Buy milk');
    expect(service.getAllTodos()[0].status).toBe('incomplete');
  });

  it('deletes a todo', async () => {
    const storage = createMemoryStorage();
    const service = createTodoService(storage);
    await service.init();

    const added = await service.addTodo('Buy milk');
    const result = await service.deleteTodo(added.todo.id);

    expect(result.success).toBe(true);
    expect(result.todo.name).toBe('Buy milk');
    expect(service.getAllTodos()).toHaveLength(0);
  });

  it('updates a todo', async () => {
    const storage = createMemoryStorage();
    const service = createTodoService(storage);
    await service.init();

    const added = await service.addTodo('Buy milk');
    const result = await service.updateTodo(added.todo.id);

    expect(result.success).toBe(true);
    expect(result.todo.name).toBe('Buy milk');
    expect(service.getAllTodos()).toHaveLength(1);
    expect(service.getAllTodos()[0].status).toBe('complete');
    expect(result.todo.status).toBe('complete');
  });

  it('fails to delete a todo with an invalid id', async () => {
    const storage = createMemoryStorage();
    const service = createTodoService(storage);
    await service.init();

    await service.addTodo('Buy milk');
    const result = await service.deleteTodo();

    expect(result.success).toBe(false);
    expect(result.reason).toBe('Invalid ID!');
    expect(service.getAllTodos()).toHaveLength(1);
  });
});
