import { useCallback } from "react";
import { message } from "antd";

import { localStorageUpdate } from "../utils";

const useSaveTodo = ({ todo, setEdit, setTodo, value }) =>
  useCallback(
    (id) => {
      const newTodo = todo.map((item) => {
        if (item.id === id) {
          item.title = value;
        }
        return item;
      });
      localStorageUpdate(newTodo);
      setTodo(newTodo);
      setEdit(null);
      message.success("Successful !");
    },
    [todo, setEdit, setTodo, value]
  );

export default useSaveTodo;
