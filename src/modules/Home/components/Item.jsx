import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { useDispatch } from 'react-redux';

import { DeleteIcon, EditIcon } from '../../global/Icons';
import { UpdateTodos } from '../state/actions';
import { EditTodo } from './EditTodo';

function Item({item, index, handleDeleteTodoById, editMode=false}) {

    const dispatch = useDispatch();

    // Edit Todo Visibility
    const [ editingItem, seteditingItem ] = useState(editMode);

    // ClassName Item controller
    let classNames = require("classnames");
    let itemClass = classNames( "item", 
        { "done": item.status === "done"},
        { "in-process": item.status === "in process"},
    );
    let circleClass = classNames( "bg-circle", 
        { "done": item.status === "done"},
        { "in-process": item.status === "in process"},
    );

    // Updated Todo
    const handleUpdatedTodo = (item) => {
        if( item === "close" ){
            return seteditingItem(false);
        }
        if( item.title !== "" ){
            console.log(item);
            dispatch( UpdateTodos(item) );
            seteditingItem(false);
        }
    }

    return (
        <Draggable key={item.id} draggableId={item.id} index={index} >
            {( draggableProvided )=>(
                <li className={itemClass}
                    {...draggableProvided.draggableProps}
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.dragHandleProps}
                >
                    { !editingItem
                        ? <>
                            <div className="content-todo">
                                <div className="content-data-todo-left">
                                    <h3 className="todo-title">{item.title}</h3>    
                                    <p className="todo-level">{item.level}</p>
                                    <div className="content-icons">
                                        <EditIcon className="icon" size="3" onClick={()=>seteditingItem(true)} />
                                        <DeleteIcon className="icon" size="3" onClick={()=>handleDeleteTodoById(item.id)} />
                                    </div>
                                </div>
                                <div className="content-data-todo-rigth">
                                    <p className="todo-description">{item.description}</p>
                                </div>
                            </div>
                        </>
                        : <>
                            <EditTodo item={item} handleUpdatedTodo={handleUpdatedTodo} />
                        </>
                        
                    }
                    <div className={circleClass}></div>
                </li>
            )}
        </Draggable>
    )
}

export default Item;
