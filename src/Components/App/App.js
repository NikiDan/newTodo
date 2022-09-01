import React, { useEffect, useState } from "react";
import "./App.css";
import TodoList from "../TodoList";
import Header from "../Header";
import AddTodo from "../AddTodo";
import Filter from "../Filter";

let App = () => {

  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const [localValue, setLocalValue] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

    const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(localValue));
  }, [localValue]);

   useEffect(() => {
       setFiltered(todo);
   }, [todo]);

  return (
    <div className="App">
      <Header />
      <AddTodo
        todo={todo}
        setTodo={setTodo}
        localValue={localValue}
        setLocalValue={setLocalValue}
      />
        <Filter
            filtered = {filtered}
            setFiltered = {setFiltered}
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
        filtered = {filtered}
        setFiltered = {setFiltered}
      />
    </div>
  );
}

export default App;
