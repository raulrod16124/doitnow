import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Footer } from '../global/Footer';
// import { Header } from '../global/Header';
import { FormTodo } from './components/FormTodo';
import { TodoItem } from './components/TodoItem';
import { CreateTodos, DeleteTodos } from './state/actions';


export const Home = () => {

    const todosState = useSelector((state)=>{
        return state.TodosReducer;
    })
    
    const dispatch = useDispatch();

    const [ todos, setTodos ] = useState();
    // References
    const mainClass = useRef(); 

    useEffect(()=>{
        setTodos(todosState);
    }, [todosState]);

    const handleCreateTodo = (todo) => {
        const newTodo = {
            id: Math.round(Math.random() * (9999 + 1000) - 1000),
            title: todo.title,
            level: todo.level,
            status: todo.status,
            description: todo.description,
            createdBy: todo.createdBy,
            expirationDate: todo.expirationDate
        };
        dispatch( CreateTodos(newTodo) );
    }

    const handleDeleteTodoById = (idTodo) =>{
        dispatch(DeleteTodos(idTodo));
    };

    return (
        <>
            <div className="home">
                <div className="main" ref={mainClass} >
                    <FormTodo handleCreateTodo={handleCreateTodo} />
                    <div className="content-body">
                        {/* <Header /> */}
                        <div className="content-todos">   
                            { todos &&
                            Object.values(todos).map( todo => {
                                return <TodoItem key={todo.id} todo={todo} handleDeleteTodoById={handleDeleteTodoById} />
                            })
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div> 
        </>
    )
}
