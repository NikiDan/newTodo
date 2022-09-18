import { nanoid } from "nanoid";

const saveTodo = ({ setTodo, setValue, value, todo }) => {
  if (value.trim() !== "") {
    const newItem = [
      ...todo,
      {
        id: nanoid(),
        title: value,
        status: true
      }
    ];
    localStorage.setItem("items", JSON.stringify(newItem));
    setTodo(newItem);
    setValue("");
  }
};

export default saveTodo;
