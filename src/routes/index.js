import React, { useEffect } from 'react'
import { Switch, useHistory } from 'react-router';

import Home from '../modules/Home/views/Home';
import Login from '../modules/Login/views/Login';
import ProtectedRoutes from './ProtectedRoutes';

function Routes() {

    const history = useHistory();

    useEffect(() => {
        const userState = JSON.parse( localStorage.getItem('user'));
        if(JSON.parse( localStorage.getItem('user')) !== null){
            // TODO - refactor this logic
            console.log(userState);
            if( !userState ){
                if(history.location.pathname !== "/login"){
                    history.push({pathname: "/login"});
                }   
                history.push({pathname: "/login"});
            } else {
                if(history.location.pathname !== "/"){
                    history.push({pathname: "/"});
                }
            }
        }
    })

    return (
        <Switch>
            <ProtectedRoutes Component="Login" path="/login" exact >
                <div className="section-content">
                    <Login/>
                </div>
            </ProtectedRoutes>
            <ProtectedRoutes Component="Home" path="/" exact >
                <div className="section-content">
                    <Home userData={JSON.parse( localStorage.getItem('user'))} /> 
                </div>
            </ProtectedRoutes>
        </Switch>
    )
}

export default Routes;
