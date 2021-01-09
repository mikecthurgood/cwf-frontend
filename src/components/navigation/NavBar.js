import React, { useContext } from 'react';
import Store from '../../context/Store'
import { Link } from 'react-router-dom';
import AuthForm from '../form/AuthForm'
import './navbar.scss'

const NavBar = () => {

    const { loginError, loginHandler, loginMenuToggle, setSearchFilter, user } = useContext(Store)

    return (
        <div className='navbar-container'>
            <Link to="/"><img src={require('../../assets/clambr_logo_blue.png')} alt="clambr logo" id='main-logo' onClick={() => setSearchFilter('')}/></Link>
            {!user.username ?
            <>
                 <div className='login-dropdown'>
                    <AuthForm 
                    loginError={loginError} 
                    onSubmit={loginHandler} 
                    signup={false} 
                    user={user}
                    loginToggle={() => {}}
                    mobileMenuToggle={() => {}}
                    loginMenuToggle={() => {}}
                />
                 </div>
            </>
                :
                <div className="navbar-account-details"><p onClick={loginMenuToggle} className='nav-username'>Hi {user.username}!</p></div>
            }

            {/* <div className='hamburger-menu'>
                <img onClick={mobileMenuToggle} src={require('../../assets/hamburger-icon.jpg')} alt="" />
            </div> */}
            <div className={`login-menu ${user.username ? 'logged-in' : '' }`}>
                <img onClick={loginMenuToggle} src={require('../../assets/login-icon.jpg')} alt="" />
            </div>
        </div >
    )
}

export default NavBar
