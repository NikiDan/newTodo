import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import { Button } from "antd";
import {
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Input, message } from "antd";
import "./Style.css";
import "animate.css";

let TodoList = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    setFiltered(todo);
  }, [todo]);

  let localStorageUpdate = (newTodo) => {
    localStorage.setItem("items", JSON.stringify(newTodo));
  }

  let deleteTodo = (id) => {
    let newTodo = [...todo].filter((item) => item.id !== id);
    setTodo(newTodo);
    localStorageUpdate(newTodo);
  }

  let animationDelete = (id) => {
    const todoContainer = document.getElementById(id);

    todoContainer.classList.remove("animate__zoomIn");
    todoContainer.classList.add("animate__fadeOutRightBig");

    todoContainer.addEventListener("animationend", () => {
      deleteTodo(id);
    });
  }

  let statusTodo = (id) => {
    let newTodo = [...todo].filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    localStorageUpdate(newTodo);
    setTodo(newTodo);
  }

  let editTodo = (id, title) => {
    setEdit(id);
    setValue(title);
  }

  let saveTodo = (id) => {
    const newTodo = todo.map((item) => {
      if (item.id === id) {
        item.title = value;
      }
      return item;
    });
    localStorageUpdate(newTodo);
    setTodo(newTodo);
    setEdit(null);
    message.success('Successful !');
  }

  let onKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveTodo(id);
    }
  };

  let todoFilter = (status) => {
    if (status === "all") {
      setFiltered(todo);
    } else {
      let newTodo = todo.filter((item) => item.status === status);
      setFiltered(newTodo);
    }
  }

  return (
    <div className="todo-list">
      <div className="todo-list__btn-group-container">
        <Button
          className="todo-list__responsive-btn todo-list__responsive-sort-btn"
          onClick={() => todoFilter("all")}
        >
          All
        </Button>
        <Button
          className="todo-list__btn-group todo-list__responsive-btn todo-list__responsive-sort-btn"
          onClick={() => todoFilter(true)}
        >
          Opened
        </Button>
        <Button
          className="todo-list__btn-group todo-list__responsive-btn todo-list__responsive-sort-btn"
          onClick={() => todoFilter(false)}
        >
          Closed
        </Button>
      </div>
      {filtered.map((item) => (
        <div
          id={item.id}
          className="todo-list__todo-container animate__animated animate__zoomIn"
          key={item.id}
        >
          {edit === item.id ? (
            <div className="todo-container__input-container">
              <Input
                className="todo-container__edit-input"
                onChange={(e) => setValue(e.target.value)}
                value={value}
                onKeyPress={(e) => onKeyPress(e, item.id)}
              />
            </div>
          ) : (
            <div
              id="todoListContent"
              className={
                !item.status
                  ? "todo-container__todo-list-disable animate__animated animate__flipInX"
                  : "todo-container__todo-list-content animate__animated animate__bounceIn"
              }
            >
              {item.title}
            </div>
          )}
          {edit === item.id ? (
            <div>
              <Button
                className="todo-container__save-btn todo-list__responsive-btn"
                onClick={() => saveTodo(item.id)}
              >
                <CheckOutlined />
              </Button>
            </div>
          ) : (
            <div className="todo-container__btn-core">
              <Button
                size="large"
                className="todo-list__responsive-btn todo-container__responsive-func-btn"
                onClick={() => statusTodo(item.id)}
              >
                {item.status ? (
                  <CheckCircleOutlined />
                ) : (
                  <CloseCircleOutlined />
                )}
              </Button>
              <Button
                size="large"
                className="todo-list__btn-group todo-list__responsive-btn todo-container__responsive-func-btn"
                onClick={() => editTodo(item.id, item.title)}
              >
                <EditOutlined />
              </Button>
              <Button
                size="large"
                className="todo-list__btn-group todo-list__responsive-btn todo-container__responsive-func-btn"
                danger
                onClick={() => animationDelete(item.id)}
              >
                <DeleteOutlined />
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TodoList;
