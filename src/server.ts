import express from 'express';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';

const app = express();

app.use(express.json());
app.use(cors());

const todos = [];
const users = [];

app.get("/todos", (request, response) => {
  return response.json(todos);
});


app.post("/signup", (request, response) => {
  const { name, email, password } = request.body;

  const user = { 
    id: uuidV4(),
    name,
    email,
    password,
    createdAt: new Date().toLocaleDateString('pt-br'),
  };

  users.push(user);

  return response.json(user);
});

app.post("/todos", (request, response) => {
  const { title, description, status} = request.body;

  const todo = { 
    id: uuidV4(),
    title,
    description,
    createdAt: new Date().toLocaleDateString('pt-br'),
    status,
  };

  todos.push(todo);

  return response.json(todo);
});

app.put("/todos/:id", (request, response) => {
  const { id } = request.params;
  const { title, description, status} = request.body;

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if(todoIndex < 0) {
      return response.status(400).json({error: 'Atividade inexistente.'})
  }

  const todo = { 
    id: uuidV4(),
    title,
    description,
    createdAt: new Date().toLocaleDateString('pt-br'),
    status,
  };

  todos[todoIndex] = todo;

  return response.json(todo);
});


app.delete("/todos/:id", (request, response) => {
  const { id } = request.params;

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if(todoIndex < 0) {
      return response.status(400).json({error: 'Repository not found.'})
  }

  todos.splice(todoIndex, 1);

  return response.status(204).send();
});

app.listen(process.env.PORT || 3333, () => {
  console.log("Server is running!")
});