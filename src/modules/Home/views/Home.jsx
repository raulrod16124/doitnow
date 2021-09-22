import React, { useEffect, useRef, useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import { Footer } from '../../global/Footer';
import { CreateTodos, DeleteTodos } from '../state/actions';
import { FormTodo } from './components/FormTodo';
import { Header } from './components/Header';
import List from './components/List';

// import { Header } from '../global/Header';


export const Home = () => {
  
    const todosState = useSelector((state)=>{
      return state.TodosReducer;
    })
    
    const dispatch = useDispatch();

    const [ todo, setTodo ] = useState([]);
    const [ inProgress, setInProgress ] = useState([]);
    const [ doneTodo, setDoneTodo ] = useState([]);
    
    const [ allTodos, setAllTodos ] = useState([]);

    // References
    const mainClass = useRef(); 

    useEffect(()=>{
      if( todosState ){
        setTodo( () => todosState.filter( item => item.status === "todo" ));
        setInProgress( () => todosState.filter( item => item.status === "inProgress" ));
        setDoneTodo( () => todosState.filter( item => item.status === "done" ));

        setAllTodos(todosState);
      }
    }, [todosState]);

    const handleCreateTodo = (todo) => {
        const newTodo = {
            id: Math.round(Math.random() * (9999 - 1000) + 1000).toString(),
            title: todo.title,
            level: todo.level,
            status: todo.status,
            description: todo.description,
        };
        dispatch( CreateTodos(newTodo) );
    }

    const handleDeleteTodoById = (idTodo) =>{
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
          
          if( source.droppableId === "todo" && destination.droppableId === "inProgress") {
            const todoToMove = todo.filter( t => {
              if(t.id === draggableId){
                t.status = "inProgress";
                return t;
              }
            });
            const updatetodo = todo.filter( t => t.id !== draggableId);
            setTodo(updatetodo);
            setInProgress([...inProgress, todoToMove[0]]);
          } else if( source.droppableId === "todo" && destination.droppableId === "done") {
            const todoToMove = todo.filter( t => {
              if(t.id === draggableId){
                t.status = "done";
                return t;
              }
            });
            const updatetodo = todo.filter( t => t.id !== draggableId);
            setTodo(updatetodo);
            setDoneTodo([...doneTodo, todoToMove[0]]);
          } else if( source.droppableId === "inProgress" && destination.droppableId === "todo") {
            const inProgressToMove = inProgress.filter( ip => {
              if(ip.id === draggableId){
                ip.status = "todo";
                return ip;
              }
            });
            const updateInProgress = inProgress.filter( ip => ip.id !== draggableId);
            setInProgress(updateInProgress);
            setTodo([...todo, inProgressToMove[0]]);
          } else if( source.droppableId === "inProgress" && destination.droppableId === "done") {
            const inProgressToMove = inProgress.filter( ip => {
              if(ip.id === draggableId){
                ip.status = "done";
                return ip;
              }
            });
            // console.log(inProgressToMove)
            const updateInProgress = inProgress.filter( ip => ip.id !== draggableId);
            setInProgress(updateInProgress);
            setDoneTodo([...doneTodo, inProgressToMove[0]]);
          } else if( source.droppableId === "done" && destination.droppableId === "todo") {
            const doneTodoToMove = doneTodo.filter( dt => {
              if(dt.id === draggableId){
                dt.status = "todo";
                return dt;
              }
            });
            const updateDoneTodo = doneTodo.filter( dt => dt.id !== draggableId);
            setDoneTodo(updateDoneTodo);
            setTodo([...todo, doneTodoToMove[0]]);
          } else if( source.droppableId === "done" && destination.droppableId === "inProgress") {
            const doneTodoToMove = doneTodo.filter( dt => {
              if(dt.id === draggableId){
                dt.status = "inProgress";
                return dt;
              }
            });
            const updateDoneTodo = doneTodo.filter( dt => dt.id !== draggableId);
            setDoneTodo(updateDoneTodo);
            setInProgress([...inProgress, doneTodoToMove[0]]);
          }
        }
        if (
          source.index === destination.index &&
          source.droppableId === destination.droppableId
        ) {
          return;
        }
        if( source.droppableId === destination.droppableId && destination.droppableId === "todo"){
          setTodo((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
          );
        } else if(source.droppableId === destination.droppableId && destination.droppableId === "inProgress") {
          setInProgress((prevTasks) =>
            reorder(prevTasks, source.index, destination.index)
          );
        } else if(source.droppableId === destination.droppableId && destination.droppableId === "done") {
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
                        <Header todos={allTodos} />
                        <div className="content-body">
                            <div className="content-lists">
                                <List key="todo" droppableID="todo" list={todo} titleList="TO DO" handleDeleteTodoById={handleDeleteTodoById} />
                                <List key="inProgress" droppableID="inProgress" list={inProgress} titleList="IN PROGRESS" handleDeleteTodoById={handleDeleteTodoById} />
                                <List key="doneTodo" droppableID="done" list={doneTodo} titleList="DONE" handleDeleteTodoById={handleDeleteTodoById} />
                            </div>
                        </div>
                    </div>
                </DragDropContext>
                <Footer />
            </div> 
        </>
    )
}
