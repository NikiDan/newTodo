import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { nanoid } from "nanoid";
import "./Style.css";

const AddTodo = ({ todo, setTodo }) => {
  const [value, setValue] = useState("");

  const saveTodo = () => {
    if (value.trim() !== "") {
      const newItem = [
        ...todo,
        {
          id: nanoid(),
          title: value,
          status: true,
        },
      ];
      localStorage.setItem("items", JSON.stringify(newItem));
      setTodo(newItem);
      setValue("");
    }
  }

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      saveTodo();
    }
  }

  return (
    <div className="add-todo">
      <input
        placeholder="Enter something"
        className="add-todo__input"
        value={value}
        onKeyPress={onKeyPress}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="add-todo__button" onClick={saveTodo}>
        <PlusOutlined />
      </button>
    </div>
  );
}

export default React.memo(AddTodo);
