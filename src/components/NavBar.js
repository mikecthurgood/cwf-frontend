import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ signInTest, signOut, user }) => {

    return (
        <div className='navbar-container'>
            {!user.username ?
                <button onClick={signInTest} className='login_logout'>Login</button>
                :
                <button onClick={signOut} className='login_logout'>Log Out</ button >
            }
            {user.username && <p className='nav-username'>Hi {user.username}</p>}
            <img src={require('../assets/clambr_logo_blue.png')} alt="clambr logo" id='main-logo' />
        </div >
    )
}

export default NavBar
