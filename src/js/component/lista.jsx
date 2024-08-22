import React from "react";
import { useState, useEffect } from "react";
import Task from "./task";



const ToDoList = (props) => {

    const [newTask,setTask] = useState('');
    const [taskList,setTaskList] = useState([]);

    const loadTasksFromAPI = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/users/luisGuerrero")
        const data = await response.json();
        setTaskList(data.todos)
    }

    const createNewTask = async () => {
        const response = await fetch("https://playground.4geeks.com/todo/todos/luisGuerrero",{
            method: "POST",
            body: {
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            }
        })
        const data = await response.json();
        setTask(data.todos) 
    }

    // const deleteTask = async () => {
    //     const response = await fetch("https://playground.4geeks.com/todo/todos/" + ,{
    //         method: "DELETE",
    //     })
    // }


    useEffect(()=>{
        loadTasksFromAPI();
        createNewTask();
    }
    ,[])

    return(
        <div className="container pt-4 m-3">
            <input
                style={{padding: "10px", margin: "10px", marginBottom: "10px"}}
                type="text" 
                value={newTask} 
                placeholder="What needs to be done?" 
                onChange={(event) => setTask(event.target.value)}
                onKeyUp={(event) => {
                    if(event.key == 'Enter'){
                        createNewTask([newTask,...taskList]);
                        setTask('')
                    }
                }   
                }
            />

            {(taskList.length == 0) && <div>No tasks, add task</div>}
            
            {taskList.map( (tarea,index) => <Task task={tarea} key={index} onRemove = { () => {
                setTaskList(taskList.filter(
                    (_tarea,indiceABorrar) => index != indiceABorrar
                ))
            }}
            />)}
            <p className="pt-2 m-3">{taskList.length} items left</p>
            
        </div>
    )
}

export default ToDoList;