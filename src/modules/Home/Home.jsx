import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Footer } from '../global/Footer';
import { Header } from '../global/Header';
import { FormTodo } from './components/FormTodo';
import List from './components/List';
import { TodoItem } from './components/TodoItem';
import { CreateTodos, DeleteTodos } from './state/actions';

// import { Header } from '../global/Header';


export const Home = () => {

    const todosState = useSelector((state)=>{
        return state.TodosReducer;
    })
    
    const dispatch = useDispatch();

    const [ todo, setTodo ] = useState([]);
    const [ doneTodo, setDoneTodo ] = useState([]);

    // References
    const mainClass = useRef(); 

    useEffect(()=>{
      console.log(todosState);
      setTodo( () => todosState.filter( item => item.status === "todo" ));
      setDoneTodo( () => todosState.filter( item => item.status === "done" ));
    }, [todosState]);

    const handleCreateTodo = (todo) => {
        const newTodo = {
            id: Math.round(Math.random() * (9999 - 1000) + 1000).toString(),
            title: todo.title,
            level: todo.level,
            status: todo.status,
            description: todo.description,
        };
        console.log(newTodo)
        dispatch( CreateTodos(newTodo) );
    }

    const handleDeleteTodoById = (idTodo) =>{
      console.log(idTodo)
        dispatch(DeleteTodos(idTodo));
    };

    // Function to reorder a List
    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
    
        return result;
    };

    const handleDragEnd = (result) =>{
      // console.log(result);
        const {source, destination, draggableId} = result;
        if(!destination){return;}
        if(source.droppableId !== destination.droppableId){
          if( source.droppableId === "todo" ){
            const todoToMove = todo.filter( t => {
              if(t.id === draggableId){
                t.status = "done";
                return t;
              }
            });
            const updatetodo = todo.filter( t => t.id !== draggableId);
            setTodo(updatetodo);
            setDoneTodo([...doneTodo, todoToMove[0]]);
          } else {
            const doneTodoToMove = doneTodo.filter( dt => {
              if(dt.id === draggableId){
                dt.status = "todo";
                return dt;
              }
            });
            const updateDoneTodo = doneTodo.filter( dt => dt.id !== draggableId);
            setDoneTodo(updateDoneTodo);
            setTodo([...todo, doneTodoToMove[0]]);
          }
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }
        if( destination.droppableId === "todo"){
          setTodo((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
          );
        } else {
          setDoneTodo((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
          );
        }
      };

    return (
        <>
            <div className="home">
                <DragDropContext onDragEnd={(result)=>handleDragEnd(result)} >
                    <div className="main" ref={mainClass} >
                        <FormTodo handleCreateTodo={handleCreateTodo} />
                        <Header />
                        <div className="content-body">
                            <div className="content-lists">
                                <List key="todo" droppableID="todo" list={todo} titleList="TO DO" handleDeleteTodoById={handleDeleteTodoById} />
                                <List key="doneTodo" droppableID="doneTodo" list={doneTodo} titleList="DONE" handleDeleteTodoById={handleDeleteTodoById} />
                            </div>
                        </div>
                    </div>
                </DragDropContext>
                <Footer />
            </div> 
        </>
    )
}
