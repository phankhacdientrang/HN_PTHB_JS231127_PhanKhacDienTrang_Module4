import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

interface Todo {
  id: number;
  name: string;
  status: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [moveDoneToEnd, setMoveDoneToEnd] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    fetchTodosFromServer();
  }, []);

  const fetchTodosFromServer = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:8080/api/v1/tasks');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  };

  const toggleTodoStatus = async (id: number) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;

      const updatedTodo = { ...todoToUpdate, status: !todoToUpdate.status };
      await axios.put(`http://localhost:8080/api/v1/tasks/${id}`, updatedTodo);
      fetchTodosFromServer();
    } catch (error) {
      console.error('Error updating todo status:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/tasks/${id}`);
      fetchTodosFromServer();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleSwitchChange = () => {
    setMoveDoneToEnd(!moveDoneToEnd);
    if (!moveDoneToEnd) {
      const sortedTodos = [...todos].sort((a, b) => {
        if (a.status === b.status) return 0;
        return a.status ? 1 : -1;
      });
      setTodos(sortedTodos);
    } else {
      fetchTodosFromServer();
    }
  };

  const addNewTodo = async () => {
    try {
      await axios.post('http://localhost:8080/api/v1/tasks', { name: newTodo, status: false });
      fetchTodosFromServer();
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div className='todo-app'>
      <div className='todo-header'>
        <h1 className='todo-title'>Todo List</h1>
        <p className='todo-subtitle'>Get things done, one item at a time</p>
        <hr />
      </div>

      <ul className='todo-list'>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.status ? 'line-through' : 'none' }}>
              {todo.name}
            </span>
            <div className='todo-actions'>
              <input
                checked={todo.status}
                className='todo-checkbox'
                type='checkbox'
                onChange={() => toggleTodoStatus(todo.id)}
              />
              <span className='todo-delete material-symbols-outlined' onClick={() => deleteTodo(todo.id)}>
                delete
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className='todo-footer'>
        <p>Move done items at the end?</p>
        <div className='toggle-switch'>
          <input
            type='checkbox'
            id='toggleSwitch'
            checked={moveDoneToEnd}
            onChange={handleSwitchChange}
          />
          <label htmlFor='toggleSwitch'></label>
        </div>
      </div>

      <h3>Add to the todo list</h3>
      <div>
        <input
          type='text'
          className='todo-input'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button className='todo-add-button' onClick={addNewTodo}>ADD ITEM</button>
      </div>
    </div>
  );
}

export default App;
