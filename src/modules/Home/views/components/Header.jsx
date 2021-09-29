import React, { useRef, useState } from 'react'

import { SettingsIcon } from '../../../global/Icons';
import UserSettings from './UserSettings';

export const Header = ({todos, userData}) => {

    const todosDone = todos.filter( todo => todo.status === "done" );

    const [ userSettingsVisibility, setuserSettingsVisibility ] = useState(false);

    // References 
    const bgModalWindow = useRef();
    const modalWindow = useRef();

    const handleDisplayModalWindow = () =>{
        setuserSettingsVisibility(true);
        bgModalWindow.current.style.display = "block"
        bgModalWindow.current.style.opacity = "1"
        setTimeout(()=>{
            modalWindow.current.style.width = "30%";
        },200);
    };

    const handleCloseModalWindow = () =>{
        modalWindow.current.style.width = "0%";
        bgModalWindow.current.style.opacity = "0"
        setTimeout(()=>{
            bgModalWindow.current.style.display = "none"
            setuserSettingsVisibility(false);
        },200);
    };

    return (
        <div className="header">
            <div className="header-top">
                <div className="data-of-app"></div>
                <div className="user-settings">
                    <p className="user-name">{userData && userData.body ? userData.body.username : ""}</p>
                    <div className="user-avatar">🐱‍👤</div>
                    <SettingsIcon className="icon" size="2.5" onClick={handleDisplayModalWindow} />
                </div>
                <div className="user-settings-block" ref={bgModalWindow} onClick={(e)=>{
                    if(e.target.className === "user-settings-block"){handleCloseModalWindow();}
                    }} >
                    <div className="user-settings-content" ref={modalWindow} >
                        {userSettingsVisibility && 
                            <UserSettings handleCloseModalWindow={handleCloseModalWindow} />
                        }
                    </div>
                </div>
            </div>
            <div className="header-bottom">
              <div className="progress-bar">
                  <div className="level-bar">
                      <div className="green-fill" style={{width: todos.length > 0 ? todosDone.length / todos.length * 100 + "%" : 0 + "%"}} ></div>
                  </div>
              </div>
            </div>
        </div>
    )
}
