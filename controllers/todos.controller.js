import Todo from '../models/Todo.schema.js';

export const getTodos = async (_, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (err) {
    console.log(err);
  }
};

export const createTodo = async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    const savedTodo = await newTodo.save();
    res.send(savedTodo);
  } catch (err) {
    console.log(err);
  }
};

export const getTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findById(id);
    res.send(todo);
  } catch (err) {
    console.log(err);
  }
};

export const updateTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.send(todo);
  } catch (err) {
    console.log(err);
  }
};

export const removeTodoById = async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await Todo.findByIdAndRemove(id);
    res.send(todo);
  } catch (err) {
    console.log(err);
  }
};
