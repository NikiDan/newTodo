const localStorageUpdate = (newTodo) => {
  localStorage.setItem("items", JSON.stringify(newTodo));
};

export default localStorageUpdate;
