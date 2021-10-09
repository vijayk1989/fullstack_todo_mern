// todo routes
import express from 'express';
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  removeTodoById
} from '../controllers/todos.controller.js';
const router = express.Router();

router.get('/', getTodos);

router.post('/', createTodo);

router.get('/:id', getTodoById);

router.put('/:id', updateTodoById);

router.delete('/:id', removeTodoById);

export default router;
