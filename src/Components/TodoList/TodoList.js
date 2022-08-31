import React, {useState, useEffect, useCallback} from "react";
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

const TodoList = ({ todo, setTodo }) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");
  const [filtered, setFiltered] = useState(todo);

  useEffect(() => {
    setFiltered(todo);
  }, [todo]);
  
  const localStorageUpdate = (newTodo) => {
    localStorage.setItem("items", JSON.stringify(newTodo));
  }

  const deleteTodo = (id) => {
    let newTodo = todo.filter((item) => item.id !== id);
    setTodo(newTodo);
    localStorageUpdate(newTodo);
  }

  const animationDelete = (id) => {
    const todoContainer = document.getElementById(id);

    todoContainer.classList.remove("animate__zoomIn");
    todoContainer.classList.add("animate__fadeOutRightBig");

    todoContainer.addEventListener("animationend", () => {
      deleteTodo(id);
    });
  }

  const statusTodo = (id) => {
    let newTodo = todo.filter((item) => {
      if (item.id === id) {
        item.status = !item.status;
      }
      return item;
    });
    localStorageUpdate(newTodo);
    setTodo(newTodo);
  }

  const editTodo = (id, title) => {
    setEdit(id);
    setValue(title);
  }

  const saveTodo = (id) => {
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

  const onKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveTodo(id);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const todoFilter = useCallback((status) => {
    console.log("Отработал todoFilter")
    if (status === "all") {
      setFiltered(todo);
    } else {
      let newTodo = todo.filter((item) => item.status === status);
      setFiltered(newTodo);
    }
  },[todo])

  return (
    <div className="todo-list">
      <div className="todo-list__filter-group">
        <Button
          className="todo-list__btn__filter-responsive todo-list__btn__filter-portrait"
          onClick={() => todoFilter("all")}
        >
          All
        </Button>
        <Button
          className="todo-list__btn__filter todo-list__btn__filter-responsive todo-list__btn__filter-portrait"
          onClick={() => todoFilter(true)}
        >
          Opened
        </Button>
        <Button
          className="todo-list__btn__filter todo-list__btn__filter-responsive todo-list__btn__filter-portrait"
          onClick={() => todoFilter(false)}
        >
          Closed
        </Button>
      </div>
      {filtered.map((item) => (
        <div
          id={item.id}
          className="todo-list__todo-notes animate__animated animate__zoomIn"
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
                  ? "todo-container__todo-notes__disable animate__animated animate__flipInX"
                  : "todo-container__todo-notes__content animate__animated animate__bounceIn"
              }
            >
              {item.title}
            </div>
          )}
          {edit === item.id ? (
            <div>
              <Button
                className="todo-container__save-btn todo-list__btn__filter-responsive"
                onClick={() => saveTodo(item.id)}
              >
                <CheckOutlined />
              </Button>
            </div>
          ) : (
            <div className="todo-container__btn__save-edit-delete">
              <Button
                size="large"
                className="todo-list__btn__filter-responsive todo-container__btn__func-responsive"
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
                className="todo-list__btn__filter todo-list__btn__filter-responsive todo-container__btn__func-responsive"
                onClick={() => editTodo(item.id, item.title)}
              >
                <EditOutlined />
              </Button>
              <Button
                size="large"
                className="todo-list__btn__filter todo-list__btn__filter-responsive todo-container__btn__func-responsive"
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

export default React.memo(TodoList);
