import React, {useEffect, useState} from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import "./AddListModule.css"

function AddTodo({todo, setTodo}) {

    const[value, setValue] = useState('')

    const [localValue, setLocalValue] = useState(
        JSON.parse(localStorage.getItem('items')) || []
    )

    useEffect(()=>{
        localStorage.setItem('items', JSON.stringify(todo))
    }, [localValue])

    function saveTodo(){
        if (value.trim() !== ''){
        setTodo(
            [...todo,{
                id: nanoid(),
                title: value,
                status: true
            }]
        )
            setLocalValue((localValue) => [...localValue, setTodo])
            setValue('')
        }
    }

    return (
        <div className="addTodo">
            <Input placeholder="Enter something"
                   className="inpTodo"
                   value={value}
                   onChange={(e)=>setValue(e.target.value)}/>
            <Button className="btnAdd" onClick={saveTodo}><PlusOutlined /></Button>
        </div>
    );
}

export default AddTodo;