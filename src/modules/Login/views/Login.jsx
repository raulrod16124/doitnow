import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { Button } from '../../../stories/Button';
import { Footer } from '../../global/Footer';
import { CheckUser } from '../state/actions';

function Login() {

    const dispatch = useDispatch();
    const history = useHistory();

    // References
    const userNameForm = useRef();
    const passwordForm = useRef();

    // useSelector to Listen the response of Login checking
    const LoginState = useSelector((state) => {
        // console.log(state.LoginReducer);
        return state.LoginReducer;
    })

    // useEffect to redirect to Home in case than the user is true
    useEffect(()=>{
        console.log(LoginState);
        if( JSON.parse( localStorage.getItem('user') !== null ) ){
            history.push({ pathname: "/"});
        }
    })
    // if the user is false show an error message

    const handleVerifyUser = (e) =>{
        e.preventDefault();

        //Dispatch with post to check the user data
        const userLogged = {
            username: userNameForm.current.value,
            password: passwordForm.current.value,
        }
        dispatch(CheckUser(userLogged))
        // console.log(userLogged);

        //Clean inputs value
        userNameForm.current.value = "";
        passwordForm.current.value = "";
    }

    return (
        <div className="login">
            <div className="login-content">
                <form className="login-form">
                    <h2 className="title">Do your things!!</h2>
                    <fieldset className="input-content">
                        <legend className="legend-title">Name</legend>
                        <input ref={userNameForm} type="text" className="input" autoFocus />
                    </fieldset>
                    <fieldset className="input-content">
                        <legend className="legend-title">Password</legend>
                        <input ref={passwordForm} type="password" className="input" />
                    </fieldset>
                    <div className="buttons-content">
                        <Button label="login" onClick={(e)=>handleVerifyUser(e)} />
                    </div>
                </form>
                <div className="login-picture"></div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;
