import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion"

import TodoCreator from "../TodoCreator";
import Filter from "../Filter";
import TodoList from "../TodoList";

import "./style.css";

const App = () => {
  const [todo, setTodo] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(todo));
    setFiltered(todo);
  }, [todo]);

  return (
      <motion.div initial="hidden" whileInView="visible" className="App">
        <div className="header">
          <h2 className="header__title">What do you want to do today ?</h2>
        </div>
        <TodoCreator todo={todo} setTodo={setTodo} />
        <Filter setFiltered={setFiltered} todo={todo} />
        <TodoList todo={todo} setTodo={setTodo} filtered={filtered} />
      </motion.div>
  );
};

App.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object),
  setTodo: PropTypes.func
};

App.defaultProps = {};

export default App;
