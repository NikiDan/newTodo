import React, {useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { DeleteOutlined,
    CheckOutlined,
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import "./TodoListModule.css";
import 'animate.css';

function TodoList({todo, setTodo}) {

    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')
    const [filtered, setFiltered] = useState(todo)

    useEffect(() => {
        setFiltered(todo)
    }, [todo])

    function deleteTodo(id){
        let newTodo = [...todo].filter(item => item.id !== id)
        setTodo(newTodo)
        localStorage.setItem('items', JSON.stringify(newTodo))
    }

    function animationDelete(id){
        const todoContainer = document.getElementById(id)

        todoContainer.classList.remove('animate__zoomIn')
        todoContainer.classList.add('animate__fadeOutRightBig')

        todoContainer.addEventListener("animationend", () => {
            deleteTodo(id)
        })
    }

    function statusTodo(id){

        let newTodo = [...todo].filter(item => {
            if(item.id === id){
                item.status = !item.status
            }
            return item
        })
        localStorage.setItem('items', JSON.stringify(newTodo))
        setTodo(newTodo)
    }

    function editTodo(id, title){
        setEdit(id)
        setValue(title)
    }

    function saveTodo(id){
        let newTodo = [...todo].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item
        })
        localStorage.setItem('items', JSON.stringify(newTodo))
        setTodo(newTodo)
        setEdit(null)
    }

    let onKeyPress = (e, id) =>{
        if(e.key === 'Enter'){
            saveTodo(id)
        }
    }

    function todoFilter(status){
        if(status === 'all'){
            setFiltered(todo)
        } else{
            let newTodo = [...todo].filter(item => item.status === status)
            setFiltered(newTodo)
        }
    }

    return(
        <div className="todoList">
            <div className="btnGroupContainer">
                <Button className="responBt responBtn responSortBtn" onClick={ ()=>todoFilter('all') }>All</Button>
                <Button className="btnGroup responBtn responSortBtn" onClick={ ()=>todoFilter(true) }>Opened</Button>
                <Button className="btnGroup responBtn responSortBtn" onClick={ ()=>todoFilter(false) }>Closed</Button>
            </div>
            {
                filtered.map(item => (
                    <div id={item.id} className="todoContainer animate__animated animate__zoomIn" key={item.id}>
                        {
                            edit === item.id ?
                                <div className="inputContainer">
                                    <Input className="editInput"
                                           onChange={(e)=>setValue(e.target.value)}
                                           value={value}
                                           onKeyPress={(e) => onKeyPress(e, item.id)}/>
                                </div> :
                                    <div id="todoListContent" className={!item.status ? "todoListDisable animate__animated animate__flipInX" : "todoListContent animate__animated animate__bounceIn"}>{item.title}</div>
                        }
                        {
                            edit === item.id ?
                                <div>
                                    <Button className="saveBtn responBtn" onClick={()=>saveTodo(item.id)}><CheckOutlined/></Button>
                                </div> :
                                <div className="btnCore">
                                    <Button size="large" className="responBtn responFuncBtn" onClick={()=>statusTodo(item.id)}>{
                                        item.status ? <CheckCircleOutlined/> : <CloseCircleOutlined />
                                    }</Button>
                                    <Button size="large" className="btnGroup responBtn responFuncBtn" onClick={()=>editTodo(item.id, item.title)}><EditOutlined /></Button>
                                    <Button size="large" className="btnGroup responBtn responFuncBtn" danger onClick={()=>animationDelete(item.id)}><DeleteOutlined /></Button>
                                </div>
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default TodoList;