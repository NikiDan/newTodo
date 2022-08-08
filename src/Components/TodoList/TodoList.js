import React, {useState, useEffect} from 'react'
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { DeleteOutlined,
    CheckOutlined,
    EditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined} from '@ant-design/icons';
import { Input } from 'antd';
import "./TodoListModule.css"

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
    }

    function statusTodo(id){
        let newTodo = [...todo].filter(item => {
            if(item.id === id){
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
        console.log(todo)
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
        setTodo(newTodo)
        setEdit(null)
    }

    function todoFilter(status){
        if(status === 'all'){
            setFiltered(todo)
        } else{
            let newTodo = [...todo].filter(item => item.status === status)
            setFiltered(newTodo)
        }
    }

    return (
        <div className="todoList">
            <div className="btnGroupContainer">
                <Button onClick={ ()=>todoFilter('all') }>All</Button>
                <Button className="btnGroup" onClick={ ()=>todoFilter(true) }>Opened</Button>
                <Button className="btnGroup" onClick={ ()=>todoFilter(false) }>Closed</Button>
            </div>
            {
                filtered.map(item => (
                    <div className="todoContainer" key={item.id}>
                        {
                            edit === item.id ?
                                <div>
                                    <Input onChange={(e)=>setValue(e.target.value)} value={value}/>
                                </div> :
                                <div className={!item.status ? "todoListDisable" : "todoListContent"}>{item.title}</div>
                        }
                        {
                            edit === item.id ?
                                <div>
                                    <Button onClick={()=>saveTodo(item.id)}><CheckOutlined/></Button>
                                </div> :
                                <div>
                                    <Button size="large" onClick={()=>statusTodo(item.id)}>{
                                        item.status ? <CheckCircleOutlined/> : <CloseCircleOutlined />
                                    }</Button>
                                    <Button size="large" className="btnGroup" onClick={()=>editTodo(item.id, item.title)}><EditOutlined /></Button>
                                    <Button size="large" className="btnGroup" danger onClick={()=>deleteTodo(item.id)}><DeleteOutlined /></Button>
                                </div>
                        }
                    </div>
                ))
            }
        </div>
    );
}

export default TodoList;