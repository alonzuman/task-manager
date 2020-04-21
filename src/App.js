import React, { useState } from 'react';
import './App.css';

function TodoInput({ addTodo }) {
  const [value, setValue] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        placeholder="Add your todo" 
        className="input-form" 
        type="text" 
        value={value} 
        onChange={e => setValue(e.target.value)}
      />
    </form>
  )
}

function Todo({todo, index, completeTodo}) {
  return (
    <div 
    style={{
      textDecoration: todo.completed ? 'line-through' : '',
      boxShadow: todo.completed ? '1px 1px 10px green' : ''
      }}
    className="todo"
    onClick={() => completeTodo(index)}
    >
      <h3>{todo.task}</h3>
    </div>
  )
}

function TodoList(props) {
  return (
    <div className="todo-list">
      {props.todos.map((todo, index) => 
      <Todo 
        completeTodo={props.completeTodo} 
        key={todo.task} 
        todo={todo}         
        index={index}
        />)}
    </div>
  )
}

function App() {
    const [todos, setTodos ] = useState([
    { task: 'Do the laundry', completed: true },
    { task: 'Make a todo list', completed: false },
    { task: 'Clean the toilet', completed: false }
  ])

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  }

  const addTodo = task => {
    console.log(task)
    const newTodo = { task: task, completed: false };
    const newTodos = [newTodo,...todos];
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoInput addTodo={addTodo}/>
      <TodoList completeTodo={completeTodo} todos={todos}/>
    </div>
  );
}

export default App;
