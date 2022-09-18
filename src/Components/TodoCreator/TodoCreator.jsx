import React, { useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
// import { nanoid } from "nanoid";

import { saveTodo } from "./utils";

import "./style.css";

const TodoCreator = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      saveTodo({ value, todo, setTodo, setValue });
    }
  };

  return (
    <div className="add-todo">
      <input
        placeholder="Enter something"
        className="add-todo__input"
        value={value}
        onKeyPress={onKeyPress}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        className="add-todo__button"
        onClick={() => saveTodo({ value, todo, setTodo, setValue })}
      >
        <PlusOutlined />
      </button>
    </div>
  );
};

TodoCreator.propTypes = {
  todo: PropTypes.arrayOf(PropTypes.object),
  setTodo: PropTypes.func
};

TodoCreator.defaultProps = {
  todo: [{}],
  setTodo: () => {
  }
};

export default React.memo(TodoCreator);
