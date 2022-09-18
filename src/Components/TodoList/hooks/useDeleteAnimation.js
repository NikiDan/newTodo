import { useCallback } from "react";

import { localStorageUpdate } from "../utils";

const useDeleteAnimation = ({ setTodo, todo }) =>
  useCallback(
    (id) => {
      const todoContainer = document.getElementById(id);

      todoContainer.classList.remove("animate__zoomIn");
      todoContainer.classList.add("animate__fadeOutRightBig");

      todoContainer.addEventListener("animationend", () => {
        const newTodo = todo.filter((item) => item.id !== id);
        setTodo(newTodo);
        localStorageUpdate(newTodo);
      });
    },
    [setTodo, todo]
  );
export default useDeleteAnimation;
