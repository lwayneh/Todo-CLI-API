export function createMemoryStorage() {
  let todoStorage = [];
  let nextId = 1;

  async function loadTodos() {
    return [nextId, todoStorage];
  }

  async function saveTodos(newNextId, newTodos) {
    todoStorage = newTodos;
    nextId = newNextId;
  }

  return {
    loadTodos,
    saveTodos,
  };
}
