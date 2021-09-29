import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { Button } from '../../../stories/Button';
import { Footer } from '../../global/Footer';
import { CheckUser } from '../state/actions';

function Login() {

    const dispatch = useDispatch();
    const history = useHistory();

    const [formVisibility, setFormVisibility] = useState({
        login: true,
        singup: false,
        recover: false,
    });
    
    useEffect(()=>{
        if( JSON.parse( localStorage.getItem('user')) ){
            history.push({ pathname: "/"});
        }
    }, [dispatch])
    
    // TODO - if the user is false show an error message
    

    // References
    const userNameForm = useRef();
    const emailForm = useRef();
    const passwordForm = useRef();

    const handleVerifyUser = (e) =>{
        const userLogged = {
            username: userNameForm.current.value,
            password: passwordForm.current.value,
        }
        dispatch(CheckUser(userLogged));
        //Clean inputs value
        userNameForm.current.value = "";
        passwordForm.current.value = "";
    }

    return (
        <div className="login">
            <div className="login-content">
                {formVisibility.login &&
                    <form className="login-form">
                        <h2 className="title">Login</h2>
                        <fieldset className="input-content">
                            <legend className="legend-title">Name</legend>
                            <input ref={userNameForm} type="text" className="input" autoFocus />
                        </fieldset>
                        <fieldset className="input-content">
                            <legend className="legend-title">Password</legend>
                            <input ref={passwordForm} type="password" className="input" />
                        </fieldset>
                        <div className="buttons-content">
                            <a href="#singup" className="singup" onClick={()=>setFormVisibility({login: false, singup:true,recover:false})} >Sing up</a>
                            <a href="#recover-password" className="recover-password" onClick={()=>setFormVisibility({login: false, singup:false,recover:true})} >forgot password?</a>
                            <Button primary label="login" onClick={(e)=>handleVerifyUser(e)} />
                        </div>
                    </form>
                }
                {formVisibility.singup &&
                    <div className="login-form">
                        <h2 className="title">Create account</h2>
                        <fieldset className="input-content">
                            <legend className="legend-title">Name</legend>
                            <input ref={userNameForm} type="text" className="input" autoFocus />
                        </fieldset>
                        <fieldset className="input-content">
                            <legend className="legend-title">Email</legend>
                            <input ref={emailForm} type="email" className="input" />
                        </fieldset>
                        <fieldset className="input-content">
                            <legend className="legend-title">Password</legend>
                            <input ref={passwordForm} type="password" className="input" />
                        </fieldset>
                        <div className="buttons-content">
                            <a href="/" className="login-btn" >Login</a>
                            <Button primary label="Sing up" />
                        </div>
                    </div>
                }
                {formVisibility.recover &&
                    <form className="login-form">
                        <h2 className="title">Do your things!! Recover</h2>
                        <fieldset className="input-content">
                            <legend className="legend-title">Name</legend>
                            <input ref={userNameForm} type="text" className="input" autoFocus />
                        </fieldset>
                        <fieldset className="input-content">
                            <legend className="legend-title">Password</legend>
                            <input ref={passwordForm} type="password" className="input" />
                        </fieldset>
                        <div className="buttons-content">
                            <a href="/" className="login-btn" >Login</a>
                            <Button primary label="recover" />
                        </div>
                    </form>
                }
                <div className="login-picture"></div>
            </div>
            <Footer />
        </div>
    )
}

export default Login;
