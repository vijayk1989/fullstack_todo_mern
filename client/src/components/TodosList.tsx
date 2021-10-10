import React from 'react';
import { useQuery } from 'react-query';
import TodoDisplay from './TodoDisplay';
import Todo from './TodoDisplay';

export type Todo = {
  _id: string;
  title: string;
  priority: string;
};

export interface IProps {
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  setPriority: React.Dispatch<React.SetStateAction<string>>;
  setIsEditing: React.Dispatch<React.SetStateAction<Boolean>>;
  setTodoId: React.Dispatch<React.SetStateAction<string>>;
}

const fetchTodos = async () => {
  const response = await fetch('http://localhost:5000/api/');
  return response.json();
};

const TodosList: React.FC<IProps> = ({
  setTodo,
  setPriority,
  setIsEditing,
  setTodoId
}: IProps) => {
  const { status, data } = useQuery<Todo[], Error>('todos', fetchTodos);

  if (status === 'error') {
    return <div className="row g-2">Unable to fetch data</div>;
  }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2">
      {data?.map((todo) => {
        return (
          <TodoDisplay
            key={todo._id}
            todo={todo}
            setTodoId={setTodoId}
            setTodo={setTodo}
            setPriority={setPriority}
            setIsEditing={setIsEditing}
          />
        );
      })}
    </div>
  );
};

export default TodosList;
