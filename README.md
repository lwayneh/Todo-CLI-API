# Todo CLI/API

A full-stack todo application with both CLI and REST API interfaces. Built with Node.js and Express, featuring file-based and in-memory storage options.

## Features

- **CLI Interface**: Interactive command-line todo manager
- **REST API**: Full HTTP API for todo operations
- **Flexible Storage**: Support for both file-based and in-memory storage
- **Task Management**: Add, list, update, and delete todos
- **Status Tracking**: Mark tasks as complete or incomplete
- **Health Check**: API endpoint to verify server status

## Project Structure

```
src/
├── cli/                    # Command-line interface
│   └── index.js           # CLI entry point
├── server/                # REST API server
│   ├── app.js             # Express app configuration
│   ├── index.js           # Server entry point
│   ├── todos.routes.js    # Todo API routes
│   ├── middleware/
│   │   └── async-handler.js
│   ├── utils/
│   │   └── http.js
│   └── validators/
│       └── todos.validators.js
├── logic/                 # Business logic
│   ├── todos.js          # Todo service
│   └── todos.test.js     # Unit tests
├── storage/              # Data persistence
│   ├── file-storage.js   # File-based storage
│   └── memory-storage.js # In-memory storage
└── data/
    └── todo.json         # Todo data file

tests/
└── api/
    └── todos.api.test.js # API integration tests

bruno/                    # API testing (Bruno)
└── todo/
    ├── Add todo.bru
    ├── Delete todo.bru
    ├── Get todos.bru
    └── Update todo.bru
```

## Installation

```bash
npm install
```

## Usage

### CLI Mode

Interactive command-line interface for managing todos:

```bash
npm run cli
# or with auto-reload during development
npm run dev
```

#### Commands

- `add <task>` - Add a new todo task
- `list` - Display all todos with their IDs and status
- `update <id>` - Toggle todo status between complete/incomplete
- `delete <id>` - Delete a todo by ID
- `exit` - Exit the application

Example:

```
todo> add Buy groceries
Buy groceries Todo task added successfully!
todo> add Write report
Write report Todo task added successfully!
todo> list
ID: 1    | Task: Buy groceries      |  Status: incomplete
ID: 2    | Task: Write report       |  Status: incomplete
todo> update 1
Successfully toggled todo - ID:1
todo> delete 2
Successfully deleted todo - ID:2 Name:Write report
```

### Server Mode

Run the REST API server:

```bash
npm run server
```

The server starts on the configured port and provides the following endpoints:

#### Endpoints

- `GET /health` - Health check
- `GET /todos` - Retrieve all todos
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update todo status
- `DELETE /todos/:id` - Delete a todo

### API Testing

The `bruno/` folder contains API request templates for testing with Bruno:

- Add todo.bru
- Get todos.bru
- Update todo.bru
- Delete todo.bru

## Testing

Run the test suite:

```bash
npm test
```

Tests include:

- Unit tests for todo service logic
- API integration tests using supertest

## Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Jest** - Testing framework
- **Supertest** - HTTP assertion library
- **Nodemon** - Development server with auto-reload

## Storage

The application supports two storage backends:

- **File Storage** (default in CLI): Persists todos to `src/data/todo.json`
- **Memory Storage**: In-memory storage for testing or temporary sessions

## Scripts

- `npm run cli` - Start the CLI
- `npm run dev` - Start the CLI with auto-reload (nodemon)
- `npm run server` - Start the REST API server
- `npm test` - Run tests

## License

ISC
