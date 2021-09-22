import React, { useEffect } from 'react'

export const Header = ({todos}) => {

    const todosDone = todos.filter( todo => todo.status === "done" );

    return (
        <div className="header">
              <div className="progress-bar">
                  <div className="level-bar">
                      <div className="green-fill" style={{width: todos.length > 0 && todosDone.length / todos.length * 100 + "%"}} ></div>
                  </div>
              </div>
              <div className="user-settings"></div>
        </div>
    )
}
