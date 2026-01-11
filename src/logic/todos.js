export function createTodoService(storage) {
  let todos = [];
  let nextId = 1;

  // Load initial values
  async function init() {
    [nextId, todos] = await storage.loadTodos();
  }

  // Add new todo task and save
  async function addTodo(todo) {
    if (!todo || typeof todo !== 'string' || !todo.trim()) {
      return { success: false, reason: 'Cannot add empty task!' };
    }
    const todoTask = {
      id: nextId,
      name: todo,
      status: 'incomplete',
    };
    todos.push(todoTask);
    nextId += 1;
    await storage.saveTodos(nextId, todos);
    return { success: true, todo: todoTask };
  }

  // Delete todo task by ID and save
  async function deleteTodo(id) {
    const index = getTodoIndexById(id);
    if (index.success === false) return index;
    const deleted = todos[index];
    todos.splice(index, 1);
    await storage.saveTodos(nextId, todos);
    return { success: true, todo: deleted };
  }

  // Update todo status to incomplete/complete and save
  async function updateTodo(id) {
    const index = getTodoIndexById(id);
    if (index.success === false) return index;
    todos[index].status =
      todos[index].status === 'incomplete' ? 'complete' : 'incomplete';
    await storage.saveTodos(nextId, todos);
    return { success: true, todo: todos[index] };
  }

  // Return array of todos to be listed
  function getAllTodos() {
    return todos;
  }

  // Helper to validate input and get index of todo by id
  function getTodoIndexById(id) {
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return { success: false, reason: 'Invalid ID!' };
    }

    const index = todos.findIndex((task) => task.id === numericId);

    if (index === -1) {
      return { success: false, reason: `Todo with id ${id} not found.` };
    }
    return index;
  }

  return {
    init,
    addTodo,
    deleteTodo,
    updateTodo,
    getAllTodos,
  };
}
