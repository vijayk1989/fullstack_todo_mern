import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

const TodoInput: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [priority, setPriority] = useState<string>('low');
  const queryClient = useQueryClient();
  const mutation = useMutation(
    'createTodo',
    (newTodo: { title: string; priority: string }) =>
      axios.post('http://localhost:5000/api', newTodo),
    {
      onSuccess: () => {
        queryClient.fetchQuery('todos');
        setTodo('');
        setPriority('low');
      }
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Form');
    mutation.mutate({ title: todo, priority: priority });
  };

  return (
    <>
      <form className="row g-2" onSubmit={(e) => onSubmit(e)}>
        <div className="row">
          <div className="col-md-10 col-12">
            <label htmlFor="todo" className="form-label">
              Enter Task
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter task..."
              name="todo"
              id="todo"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </div>
          <div className="col-md-2 col-12">
            <label htmlFor="priority" className="form-label">
              Priority
            </label>
            <select
              className="form-select"
              name="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="m-2">
          <button type="submit" className="btn btn-primary">
            Enter
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoInput;
