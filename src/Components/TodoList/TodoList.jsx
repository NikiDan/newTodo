import React, { useState, useCallback } from "react";
import "antd/dist/antd.css";
import {
  DeleteOutlined,
  CheckOutlined,
  EditOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "animate.css";
import { Reorder, AnimatePresence, motion } from "framer-motion";

import { useDeleteAnimation, useSaveTodo } from "./hooks";

import { localStorageUpdate } from "./utils";

import "./style.css";

const TodoList = ({ todo, setTodo, filtered }, ref) => {
  const [edit, setEdit] = useState(null);
  const [value, setValue] = useState("");

  const deleteAnimation = useDeleteAnimation({ setTodo, todo });
  const saveTodo = useSaveTodo({ todo, setEdit, setTodo, value });

  const statusTodo = useCallback(
    (id) => {
      let newTodo = todo.filter((item) => {
        if (item.id === id) {
          item.status = !item.status;
        }
        return item;
      });

      localStorageUpdate(newTodo);
      setTodo(newTodo);
    },
    [todo, setTodo]
  );

  const editTodo = (id, title) => {
    setEdit(id);
    setValue(title);
  };

  const onKeyPress = (e, id) => {
    if (e.key === "Enter") {
      saveTodo(id);
    }
  };

  const scrollAnimation = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1
      }
    }
  };

  return (
    <Reorder.Group
      ref={ref}
      as="div"
      axys="y"
      values={todo}
      onReorder={setTodo}
      className="todo-list"
    >
      <AnimatePresence>
        {filtered.map((item) => (
          <Reorder.Item
            as="div"
            value={item}
            whileDrag={{
              scale: 1.05
            }}
            key={item.id}
          >
            <motion.div
              key={item.id}
              className="motion-div"
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.1, once: true }}
              variants={scrollAnimation}
            >
              <motion.div
                className="todo-list__todo-notes"
                key={item.id}
              >
                {edit === item.id ? (
                  <div className="todo-container__input-container">
                    <input
                      className="todo-container__edit-input"
                      onChange={(e) => setValue(e.target.value)}
                      value={value}
                      onKeyDown={(e) => onKeyPress(e, item.id)}
                    />
                  </div>
                ) : (
                  <div
                    id="todoListContent"
                    className={
                      !item.status
                        ? "todo-container__todo-notes__disable"
                        : "todo-container__todo-notes__content"
                    }
                  >
                    {item.title}
                  </div>
                )}
                {edit === item.id ? (
                  <div>
                    <button
                      className="todo-list__btn todo-list__btn__save"
                      onClick={() => saveTodo(item.id)}
                    >
                      <CheckOutlined />
                    </button>
                  </div>
                ) : (
                  <div className="todo-container__btn__save-edit-delete">
                    <button
                      className="todo-list__btn todo-container__btn__func-responsive"
                      onClick={() => statusTodo(item.id)}
                    >
                      {item.status ? (
                        <CheckCircleOutlined />
                      ) : (
                        <CloseCircleOutlined />
                      )}
                    </button>
                    <button
                      className="todo-list__btn todo-list__btn__edit todo-container__btn__func-responsive"
                      onClick={() => editTodo(item.id, item.title)}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="todo-list__btn todo-list__btn__delete todo-container__btn__func-responsive"
                      onClick={() => deleteAnimation(item.id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </Reorder.Item>
        ))}
      </AnimatePresence>
    </Reorder.Group>
  );
};

export default React.memo(TodoList);
