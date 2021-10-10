import axios from 'axios';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Todo, IProps as Props } from './TodosList';

interface IProps extends Props {
  todo: Todo;
}

const TodoDisplay: React.FC<IProps> = ({
  todo,
  setTodo,
  setPriority,
  setIsEditing,
  setTodoId
}: IProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    (id: string) => axios.delete(`http://localhost:5000/api/${id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todos');
      }
    }
  );
  const onDelete = () => {
    mutation.mutate(todo._id);
  };
  const onEdit = () => {
    setTodo(todo.title);
    setPriority(todo.priority);
    setTodoId(todo._id);
    setIsEditing(true);
  };
  return (
    <div className="card mb-2">
      <div className="card-body">
        <div className="row">
          <div className="col-10">
            <h5 className="card-title">{todo.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted text-capitalize">
              {todo.priority}
            </h6>
          </div>
          <div className="col-2">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary btn-sm mx-2"
                onClick={() => onEdit()}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDelete()}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoDisplay;
