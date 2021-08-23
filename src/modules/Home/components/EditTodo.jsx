import React, { useRef, useState } from 'react';
import { CancelIcon, CheckSaveIcon } from '../../global/Icons';

export const EditTodo = ({todo, handleUpdatedTodo}) => {

    // Todo Data Update
    const [ updateDataTodo, setupdateDataTodo ] = useState(todo);

    // References
    const levelTodo = useRef();
    const statusTodo = useRef();
    const titleTodo = useRef();
    const descriptionTodo = useRef();

    // Update todo
    const handleCloseEditingTodo = () =>{
        handleUpdatedTodo("close");
    }

    // Save New Data Todo
    const handleSaveNewDataTodo = ()=>{
        setupdateDataTodo({...todo,
            title: titleTodo.current.value,
            description: descriptionTodo.current.value,
        })
        console.log(updateDataTodo.level);
        handleUpdatedTodo(updateDataTodo);
    }

    return (
        <div className="content-edit-todo">
            <div className="content-data-todo-left">
                <input className="todo-title" ref={titleTodo} type="text" value={updateDataTodo.title} onChange={(e)=>setupdateDataTodo({...updateDataTodo, title: e.target.value})} />
                <textarea className="todo-description" ref={descriptionTodo} type="text" value={updateDataTodo.description} onChange={(e)=>setupdateDataTodo({...updateDataTodo, description: e.target.value})} />
            </div>
            <div className="content-data-todo-right">
                <div className="content-extra-data">
                    <select className="todo-level" onClick={()=>setupdateDataTodo({...todo,level : levelTodo.current.value})} defaultValue={updateDataTodo.level} ref={levelTodo}>
                        <option className="select-level">easy</option>
                        <option className="select-level">mediun</option>
                        <option className="select-level">hard</option>
                        <option className="select-level">killing</option>
                        <option className="select-level">💀</option>
                    </select>
                    <select className="todo-status" onClick={()=>setupdateDataTodo({...todo,status : statusTodo.current.value})} defaultValue={updateDataTodo.status} ref={statusTodo}>
                        <option className="select-level">Todo</option>
                        <option className="select-level">In process</option>
                        <option className="select-level">Review</option>
                        <option className="select-level">Done</option>
                    </select>
                </div>
                <div className="content-icons">
                    <CheckSaveIcon className="icon" size="5" onClick={handleSaveNewDataTodo} color="#1DD620" />
                    <CancelIcon className="icon" size="5" onClick={handleCloseEditingTodo} color="#ED4E2C" />
                </div>   
            </div>
        </div>
    )
}
