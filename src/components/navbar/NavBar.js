import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../form/AuthForm'
import './navbar.scss'

const NavBar = ({ loginError, loginHandler, setSearchFilter, signInTest, setSignUpFlag, signOut, user, mobileMenuToggle }) => {

    return (
        <div className='navbar-container'>
            <Link to="/"><img src={require('../../assets/clambr_logo_blue.png')} alt="clambr logo" id='main-logo' onClick={() => setSearchFilter('')}/></Link>
            {!user.username ?
            <>
                 <div className='login-dropdown'>
                    <AuthForm loginError={loginError} onSubmit={loginHandler} signup={false} setSignUpFlag={setSignUpFlag} user={user} />
                 </div>
            </>
                :
                <div className="navbar-account-details"><p onClick={mobileMenuToggle} className='nav-username'>Hello {user.username}</p> <button onClick={signOut} className='login_logout'>Log Out</ button ></div>
            }

            <div className='hamburger-menu'>
                <img onClick={mobileMenuToggle} src={require('../../assets/hamburger-icon.jpg')} alt="" />
            </div>
        </div >
    )
}

export default NavBar
