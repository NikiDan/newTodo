import React, {useState} from 'react'
import { Input } from 'antd';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import "./AddListModule.css"

function AddTodo({todo, setTodo, setLocalValue}) {

    const[value, setValue] = useState('')

    function saveTodo(){
        if (value.trim() !== ''){
            let newItem =[...todo, {
               id: nanoid(),
               title: value,
               status: true
           }]
            setLocalValue((localValue) => [...localValue, {
                id: nanoid(),
                title: value,
                status: true
            }])
            setTodo(newItem)
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