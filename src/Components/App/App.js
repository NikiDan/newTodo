import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList from "../TodoList";
import Header from "../Header";
import AddTodo from "../AddTodo";

function App() {
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [localValue, setLocalValue] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(localValue));
  }, [localValue]);

  return (
    <div className="App">
      <Header />
      <AddTodo
        todo={todo}
        setTodo={setTodo}
        localValue={localValue}
        setLocalValue={setLocalValue}
      />
      <TodoList
        todo={todo}
        setTodo={setTodo}
        localValue={localValue}
        setLocalValue={setLocalValue}
      />
    </div>
  );
}

export default App;
