import React from "react";
import { useState } from "react";
import ToDoList from "./lista";


const Task = (props) => {

    const [isHover, setIsHover] = useState(false);

    const deleteTask = async (id) => {
        try{
            const response = await fetch("https://playground.4geeks.com/todo/todos/" + id,{
                method: "DELETE",
            })
            if(!response.ok){
                throw new Error("There has been an error deleting this task, check again")
            };
        }
        catch (error) {
            console.log("There has been an error deleting this task")
        }        
    }

    const handleDelete = (id) => {
        console.log(id)
        deleteTask(id)
    }

    return(
        <div className="d-flex justify-content-center w-100">
            <div className="d-flex justify-content-between border p-1 m-1" style={{width: "50%", alignSelf: "center",borderColor:"black" }}
                onMouseEnter={
                    () => {
                    setIsHover(true);
                }}
                onMouseLeave={
                    () => {
                    setIsHover(false);
                }}
                >
                <p>
                    {props.task.label}
                </p>
                {(isHover) && <button
                    type="button" className="btn-close danger"
                    onClick={() => {
                        
                        handleDelete(props.taskId);
                        props.onRemove()
                    }}
                />}
                
            </div>
        </div>
    )
}

export default Task;