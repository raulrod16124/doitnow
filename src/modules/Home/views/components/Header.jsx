import React from 'react'
import { useHistory } from 'react-router';

import { Button } from '../../../../stories/Button';

export const Header = ({todos}) => {

    const history = useHistory();

    const todosDone = todos.filter( todo => todo.status === "done" );

    const handleLogoutUser = () =>{
        localStorage.clear();
        history.push({pathname: '/login'});
    }

    return (
        <div className="header">
              <div className="progress-bar">
                  <div className="level-bar">
                      <div className="green-fill" style={{width: todos.length > 0 ? todosDone.length / todos.length * 100 + "%" : 0 + "%"}} ></div>
                  </div>
              </div>
              <div className="user-settings">
                  {/* Button to logout */}
                  <Button label="logout" onClick={handleLogoutUser} />
              </div>
        </div>
    )
}
