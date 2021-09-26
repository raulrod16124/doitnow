import React, { useEffect } from 'react'
import { Route, useHistory } from 'react-router-dom';

function ProtectedRoutes({Component, ...restOfProps }) {

    let userState = {};

    const history = useHistory();

    useEffect(()=>{
        if( JSON.parse( localStorage.getItem('user') ) ){
            userState = JSON.parse( localStorage.getItem('user'));
        } 
        if( !userState.token ){
            history.push({pathname: "/login"});
        }
    }, [])


    return (
        // <Route {...restOfProps}
        //     render={(props) => <Component {...props} /> }
        // />
        <Route {...restOfProps}
            render={(props) => userState.token && <Component {...props} /> }
        />
    )
}

export default ProtectedRoutes;
