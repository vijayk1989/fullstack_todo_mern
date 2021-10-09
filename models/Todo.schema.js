// Todo schema
import mongoose from 'mongoose';
const { Schema } = mongoose;

const todoSchema = new Schema({
  title: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  completed: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
