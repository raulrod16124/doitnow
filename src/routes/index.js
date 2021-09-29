import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Switch, useHistory } from 'react-router';

import Home from '../modules/Home/views/Home';
import Login from '../modules/Login/views/Login';
import ProtectedRoutes from './ProtectedRoutes';

function Routes() {

    const history = useHistory();

    const loginReducer = useSelector((state) => {
        console.log(state.loginReducer);
        return state.loginReducer;
    })

    useEffect(() => {
        console.log(JSON.parse( localStorage.getItem('user')));
        if(JSON.parse( localStorage.getItem('user')) !== null){
            history.push({ pathname: "/"});
        } else {
            history.push({pathname: "/login"});
        }
    }, [JSON.parse( localStorage.getItem('user'))]);

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
