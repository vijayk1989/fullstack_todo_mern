import { useQuery } from 'react-query';
import TodoDisplay from './TodoDisplay';
import Todo from './TodoDisplay';

export type Todo = {
  id: string;
  title: string;
  priority: string;
};

const fetchTodos = async () => {
  const response = await fetch('http://localhost:5000/api/');
  return response.json();
};

const TodosList: React.FC = () => {
  const { status, data } = useQuery<Todo[], Error>('todos', async () => {
    return await fetchTodos();
  });

  const renderConditionally = () => {
    console.log(data);
    if (status === 'error') {
      return <div className="row g-2">Unable to fetch data</div>;
    } else if (status === 'loading') {
      return <div>Loading...</div>;
    } else if (status === 'success') {
      return (
        <div className="m-2">
          {data?.map((todo) => {
            return <TodoDisplay key={todo.id} todo={todo} />;
          })}
        </div>
      );
    }
  };

  return <div>{renderConditionally()}</div>;
};

export default TodosList;
