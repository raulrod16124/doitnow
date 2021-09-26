import React from 'react'
import { useHistory } from 'react-router';

import { Button } from '../../../../stories/Button';
import { CloseIcon } from '../../../global/Icons';

function UserSettings({handleCloseModalWindow}) {

    const history = useHistory();

    const handleLogoutUser = () =>{
        localStorage.clear();
        history.push({pathname: '/login'});
    }

    return (
        <div className="modal-window">
            <div className="modal-window-header">
                <h2 className="title">Settings</h2>
                <CloseIcon size="3" className="icon" onClick={handleCloseModalWindow} />
            </div>
            <div className="settings">
                <li className="option">Theme</li>
                <li className="option">Profile</li>
                <li className="option">Settings</li>
            </div>
            <Button size="mediun" label="logout" onClick={handleLogoutUser} />
        </div>
    )
}

export default UserSettings
