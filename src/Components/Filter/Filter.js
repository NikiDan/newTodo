import React, { useCallback } from "react";
import "./Style.css";

const Filter = ({ todo, setFiltered}) => {

    const todoFilter = useCallback((status) => {
        if (status === "all") {
            setFiltered(todo);
        } else {
            let newTodo = todo.filter((item) => item.status === status);
            setFiltered(newTodo);
        }
    },[todo, setFiltered])

    return (
        <div className="todo-list__filter-group">
            <button
                type="submit"
                className="filter-btn
                todo-list__btn__filter-responsive
                todo-list__btn__filter-portrait"
                onClick={() => todoFilter("all")}
                id = "filter-btn"
            >
                All
            </button>
            <button
                className="filter-btn
                todo-list__btn__filter
                todo-list__btn__filter-responsive
                todo-list__btn__filter-portrait"
                onClick={() => todoFilter(true)}
            >
                Opened
            </button>
            <button
                className="filter-btn
                todo-list__btn__filter
                todo-list__btn__filter-responsive
                todo-list__btn__filter-portrait"
                onClick={() => todoFilter(false)}
            >
                Closed
            </button>
        </div>
    );
}

export default React.memo(Filter)