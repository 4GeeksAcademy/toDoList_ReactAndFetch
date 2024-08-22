import React from "react";
import { useState } from "react";

const Task = (props) => {

    const [isHover, setIsHover] = useState(false);

    return(
        <div className="d-flex justify-content-center w-100">
            <div className="d-flex justify-content-between border p" style={{width: "50%", alignSelf: "center", }}
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
                        props.onRemove()
                    }}
                />}
                
            </div>
        </div>
    )
}

export default Task;