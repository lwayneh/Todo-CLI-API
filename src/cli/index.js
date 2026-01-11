import readline from 'readline';
import { createTodoService } from '../logic/todos.js';
import * as fileStorage from '../storage/file-storage.js';

const service = createTodoService(fileStorage);

await service.init();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'todo>',
});

console.log('Welcome to ToDo CLI!');
rl.prompt();

rl.on('line', async (line) => {
  const [command, ...args] = line.trim().split(' ');

  let result;
  switch (command) {
    case 'add':
      result = await service.addTodo(args.join(' '));
      if (result.success) {
        console.log(`${result.todo.name} Todo task added successfully!`);
      } else {
        console.log(result.reason);
      }
      break;
    case 'list':
      const list = service.getAllTodos();
      list.forEach((todo) => {
        console.log(
          `ID: ${todo.id.toString().padEnd(4)} | Task: ${todo.name.padEnd(
            20,
          )} |  Status: ${todo.status}`,
        );
      });
      break;
    case 'delete':
      result = await service.deleteTodo(args[0]);
      if (result.success) {
        console.log(
          `Successfully deleted todo - ID:${result.todo.id} Name:${result.todo.name} `,
        );
      } else {
        console.log(result.reason);
      }
      break;
    case 'update':
      result = await service.updateTodo(args[0]);
      if (result.success) {
        console.log(
          `Successfully updated status to ${result.todo.status} for todo - ID:${result.todo.id} Name:${result.todo.name}`,
        );
      } else {
        console.log(result.reason);
      }
      break;
    case 'exit':
      rl.close();
      return;
    default:
      console.log('Unknown command. Use: add, list, delete, update, exit');
  }

  rl.prompt();
}).on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
