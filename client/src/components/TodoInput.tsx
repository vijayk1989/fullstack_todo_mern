import axios from 'axios';
import React, { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';

interface IProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  priority: string;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  isEditing: Boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<Boolean>>;
  todoId: string;
}

const TodoInput: React.FC<IProps> = ({
  todo,
  setTodo,
  priority,
  setPriority,
  isEditing,
  setIsEditing,
  todoId
}: IProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    'createTodo',
    (newTodo: { title: string; priority: string }) =>
      axios.post('http://localhost:5000/api', newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        setTodo('');
        setPriority('low');
      }
    }
  );

  const mutation2 = useMutation(
    'createTodo',
    (updatedTodo: { title: string; priority: string }) =>
      axios.put(`http://localhost:5000/api/${todoId}`, updatedTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
        setTodo('');
        setPriority('low');
      }
    }
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Form');
    if (!isEditing) {
      mutation.mutate({ title: todo, priority: priority });
    } else {
      mutation2.mutate({ title: todo, priority: priority });
    }
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setTodo('');
    setPriority('');
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
            {isEditing ? 'Edit' : 'Enter'}
          </button>
          {isEditing && (
            <button className="btn btn-primary mx-2" onClick={onCancelEdit}>
              Cancel Edit
              {console.log(todoId)}
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default TodoInput;
