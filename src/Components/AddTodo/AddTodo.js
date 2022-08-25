import React, { useState } from "react";
import { Input } from "antd";
import { Button } from "antd";
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
      <Input
        placeholder="Enter something"
        className="add-todo__input"
        value={value}
        onKeyPress={onKeyPress}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button className="add-todo__button" onClick={saveTodo}>
        <PlusOutlined />
      </Button>
    </div>
  );
}

export default AddTodo;
