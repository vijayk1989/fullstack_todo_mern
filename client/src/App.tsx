import React, { useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodosList from './components/TodosList';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [priority, setPriority] = useState<string>('low');
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [todoId, setTodoId] = useState<string>('');
  return (
    <div className="container">
      <h1 className="display-3 text-center">My todos app</h1>
      <div className="m-3">
        <TodoInput
          setTodo={setTodo}
          setPriority={setPriority}
          todo={todo}
          todoId={todoId}
          priority={priority}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
        />
      </div>
      <div className="m-3">
        <TodosList
          setTodo={setTodo}
          setPriority={setPriority}
          setTodoId={setTodoId}
          setIsEditing={setIsEditing}
        />
      </div>
    </div>
  );
};

export default App;
