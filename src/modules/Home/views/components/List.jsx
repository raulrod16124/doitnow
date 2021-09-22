import React from 'react'
import { Droppable } from 'react-beautiful-dnd'

import Item from './Item';

function List({droppableID, list, titleList, handleDeleteTodoById}) {
    // console.log(list);
    return (
        <Droppable droppableId={droppableID}>
            {( droppableProvided )=>(
                <ul className="list"
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                >
                    <h2 className="list-title">{titleList}</h2>
                    {Object.values(list).map( (item, index)=>{
                        // console.log(item)
                        return <Item key={item.id} item={item} index={index} handleDeleteTodoById={handleDeleteTodoById} />;   
                    })}
                {droppableProvided.placeholder}
                </ul>
            )}
        </Droppable>
    )
}

export default List;