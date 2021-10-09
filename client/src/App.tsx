import React, { useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodosList from './components/TodosList';

const App: React.FC = () => {
  return (
    <div className="container">
      <h1 className="display-3 text-center">My todos app</h1>
      <div className="m-3">
        <TodoInput />
      </div>
      <div className="m-3">
        <TodosList />
      </div>
    </div>
  );
};

export default App;
