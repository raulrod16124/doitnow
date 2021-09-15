import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

import { DeleteIcon, EditIcon } from '../../global/Icons';
import { UpdateTodos } from '../state/actions';
import { EditTodo } from './EditTodo';

export const TodoItem = ({todo, handleDeleteTodoById, editMode=false }) => {

    const dispatch = useDispatch();

    // Edit Todo Visibility
    const [ editingTodo, seteditingTodo ] = useState(editMode);

    // ClassName Todo controller
    let classNames = require('classnames');
    let todoClass = classNames( 'todo animate__animated animate__bounceIn', 
        { "Done": todo.status === "Done"},
        { "In-process": todo.status === "In process"},
        { "Review": todo.status === "Review"},
    );
    let circleClass = classNames( 'bg-circle', 
        { "Done": todo.status === "Done"},
        { "In-process": todo.status === "In process"},
        { "Review": todo.status === "Review"},
    );

    // Delete Todo
    const handleDeleteTodo = (idTodo) => {
        handleDeleteTodoById(idTodo);
    };

    // Updated Todo
    const handleUpdatedTodo = (todo) => {
        if( todo === "close" ){
            return seteditingTodo(false);
        }
        if( todo.title !== "" ){
            console.log(todo);
            dispatch( UpdateTodos(todo) );
            seteditingTodo(false);
        }
    }

    // console.log(todo);

    return (
        <li className={todoClass} key={todo.id}>
            { !editingTodo
                ? <>
                    <div className="content-data-todo-left">
                        <h3 className="todo-title">{todo.title}</h3>
                        <p className="todo-description">{todo.description}</p>
                    </div>
                    <div className="content-data-todo-right">
                        <div className="content-extra-data">
                            <p   className="todo-level">Level: {todo.level}</p    >
                            <p   className="todo-status">State: {todo.status}</p  >
                        </div>
                        <div className="content-icons">
                            <EditIcon className="icon" size="5" onClick={()=>seteditingTodo(true)} />
                            <DeleteIcon className="icon" size="5" onClick={()=>handleDeleteTodo(todo.id)} />
                        </div>
                    </div>
                </>
                : <>
                    <EditTodo todo={todo} handleUpdatedTodo={handleUpdatedTodo} />
                </>
                
            }
            <div className={circleClass}></div>
        </li>
    )
}
