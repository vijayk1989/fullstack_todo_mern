import React from 'react';
import { Todo } from './TodosList';

interface IProps {
  todo: Todo;
}

const TodoDisplay: React.FC<IProps> = ({ todo }: IProps) => {
  return (
    <div className="card mb-2">
      <div className="card-body">
        <h5 className="card-title">{todo.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted text-capitalize">
          {todo.priority}
        </h6>
      </div>
    </div>
  );
};

export default TodoDisplay;
