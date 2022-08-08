import React, {useEffect, useState} from 'react'
import './App.css';
import TodoList  from "./Components/TodoList/TodoList";
import Header from "./Components/Header/Header"
import AddTodo from "./Components/AddTodo/AddTodo"
import { nanoid } from 'nanoid'

function App() {

  const[todo, setTodo] = useState([{
      id: nanoid(),
      title: 'Example',
      status: true
  }])

  return (
    <div className="App">
        <Header />
        <AddTodo todo = {todo} setTodo = {setTodo} />
        <TodoList todo = {todo} setTodo = {setTodo}/>
    </div>
  );
}

export default App;
