import React, { useEffect, useRef, useState } from 'react'
import { Message } from '../../global/Message'

export const FormTodo = ({handleCreateTodo, handleFormVisbility}) => {

    const initialTodoState = {
        title: "",
        level: "easy",
        status: "Todo",
        description: "",
    }

    // Todo state
    const [todo, setTodo] = useState(initialTodoState);

    // Number classColor state
    const [ colorTitle, setColorTitle ] = useState(1);

    // Error State
    const [ error, setError ] = useState({
        visible: false,
        title: "Title is required",
    });

    // References
    const titleForm = useRef();
    const levelForm = useRef();
    const descriptionForm = useRef();

    // Function to change colors
    useEffect(() => {
        setTimeout(()=>{
            if( colorTitle === 5 ){
                return setColorTitle(1);
            }
            setColorTitle(colorTitle + 1);
        },1500);
    })


    // Class Title App controler
    let classNames = require('classnames');
    let titleAppClass = classNames( "title-app animate__animated animate__bounceIn", 
        { "color1" : colorTitle === 1 },
        { "color2" : colorTitle === 2 },
        { "color3" : colorTitle === 3 },
        { "color4" : colorTitle === 4 },
    )

    // Functions
    const handleSaveTodo = (e) =>{
        setTodo({...todo, 
            title: titleForm.current.value,
            level: levelForm.current.value,
            description: descriptionForm.current.value
        });
        e.preventDefault();
        if( todo.title !== "" ){
            handleCreateTodo(todo);
            setTodo(initialTodoState);
            titleForm.current.value = "";
            levelForm.current.value = "easy";
            descriptionForm.current.value = "";
        } else {
            setError({...error, visible: true});
            setTimeout(()=>{
                setError({...error, visible: false});
            }, 2500);
        }
    }


    return (
        <form className="form" onSubmit={handleSaveTodo} >
            <div className={titleAppClass}>DO IT NOW!!</div>
            <input className="form-title" ref={titleForm} type="text" placeholder="Title..." onChange={(e)=>setTodo({...todo, title: e.target.value})} />
            <select className="form-level" ref={levelForm} defaultValue="easy" onChange={(e)=>setTodo({...todo, level : e.target.value})}>
                <option className="select-level">easy</option>
                <option className="select-level">mediun</option>
                <option className="select-level">hard</option>
                <option className="select-level">killing</option>
                <option className="select-level">💀</option>
            </select>
            <textarea className="form-description" ref={descriptionForm} placeholder="Description..." onChange={(e)=>setTodo({...todo, description: e.target.value})} />
            <button className="btn btn-form" type="submit">Add new task</button>
            <div className="content-message">
                {  error.visible &&
                    <Message children={error.title} color="#ED4E2C" padding=".5vh 2vw" margin="5vh auto" />
                }
            </div>
        </form>
    )
}
