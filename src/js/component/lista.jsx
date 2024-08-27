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

    const createNewTask = async (task) => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/todos/luisGuerrero",{
                method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(task)
            })
            if(!response.ok){
                throw new Error("There has been an error creating this task, check again")
            } 
            loadTasksFromAPI();
            setTask('')
        }
        catch (error) {
            console.log("There has been an error creating this task")
        }
    }

    useEffect(()=>{
        loadTasksFromAPI();
    },[])

    const handleSubmit = () => {
        if (newTask.trim() !== '') {
            const task = {
                label: newTask,
                done: false
            };
            createNewTask(task);
        }
    }

    const handleInputChange = (e) => {
        setTask(e.target.value)
    }

    return(
        <div className="container pt-4 m-3">
            <input
                style={{padding: "10px", margin: "10px", marginBottom: "10px"}}
                type="text" 
                value={newTask} 
                placeholder="What needs to be done?" 

                onChange={handleInputChange}

                onKeyUp={(event) => {
                    if(event.key === 'Enter'){
                        handleSubmit();
                    }
                }}
            />

            {(taskList.length === 0) && <div>No tasks, add task</div>}
            
            {taskList.map( (tarea,index) => <Task task={tarea} taskId={tarea.id} key={index} onRemove = { () => {
                loadTasksFromAPI();
            }}
            />)}
            <p className="pt-2 m-3">{taskList.length} items left</p>
            
        </div>
    )
}

export default ToDoList;