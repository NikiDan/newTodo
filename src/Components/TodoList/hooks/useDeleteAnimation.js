import { useCallback } from "react";

import { localStorageUpdate } from "../utils";

const useDeleteAnimation = ({ setTodo, todo }) =>
  useCallback(
    (id) => {
      const newTodo = todo.filter((item) => item.id !== id);
      setTodo(newTodo);
      localStorageUpdate(newTodo);
    },
    [setTodo, todo]
  );
export default useDeleteAnimation;
