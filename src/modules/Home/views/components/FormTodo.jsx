import React, { useEffect, useRef, useState } from 'react'

import { Button } from '../../../../stories/Button';
import { Message } from '../../../global/Message'

export const FormTodo = ({handleCreateTodo, handleFormVisbility}) => {

    const initialTodoState = {
        title: "",
        level: "easy",
        status: "todo",
        description: "",
    }

    // Todo state
    const [todo, setTodo] = useState(initialTodoState);

    // Section Selected
    const [sectionVisibility, setSectionVisibility] = useState({
        form: true,
        contacts: false,
        settings: false
    })

    // Section class Selected controller
    let classNames = require("classnames");
    let sectionFormClass = classNames("section",{selected: sectionVisibility.form});
    let sectionContacsClass = classNames("section",{selected: sectionVisibility.contacts});
    let sectionSettingsClass = classNames("section",{selected: sectionVisibility.settings});

    // Error State
    const [ error, setError ] = useState({
        visible: false,
        title: "Title is required",
    });

    // References
    const titleForm = useRef();
    const levelForm = useRef();
    const descriptionForm = useRef();

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
            <div className="logo-app">🏀 Logo APP</div>
            <ul className="content-sections">
                <li className={sectionFormClass} onClick={()=>setSectionVisibility({form:true, contacts:false, settings:false})} >Task Form</li>
                <li className={sectionContacsClass} onClick={()=>setSectionVisibility({form:false, contacts:true, settings:false})} >Contacts</li>
                <li className={sectionSettingsClass} onClick={()=>setSectionVisibility({form:false, contacts:false, settings:true})} >Settings</li>
            </ul>
            <div className="content-form">
                {sectionVisibility.form &&
                    <>
                        <div className="title-form">Create your task</div>
                        <input className="form-title" ref={titleForm} type="text" placeholder="Title..." onChange={(e)=>setTodo({...todo, title: e.target.value})} />
                        <select className="form-level" ref={levelForm} defaultValue="easy" onChange={(e)=>setTodo({...todo, level : e.target.value})}>
                            <option className="select-level">easy</option>
                            <option className="select-level">mediun</option>
                            <option className="select-level">hard</option>
                            <option className="select-level">killing</option>
                            <option className="select-level">💀</option>
                        </select>
                        <textarea className="form-description" ref={descriptionForm} placeholder="Description..." onChange={(e)=>setTodo({...todo, description: e.target.value})} />
                        <Button primary={true} size="large" label="Add new task" />
                        <div className="content-message">
                            {  error.visible &&
                                <Message children={error.title} color="#ED4E2C" padding=".5vh 2vw" margin="5vh auto" />
                            }
                        </div>
                    </>
                }
                {sectionVisibility.contacts &&
                    <p style={{color:"#fff"}}>Here the contacts section</p>
                }
                {sectionVisibility.settings &&
                    <p style={{color:"#fff"}}>Here the Settings section</p>
                }
            </div>
        </form>
    )
}
