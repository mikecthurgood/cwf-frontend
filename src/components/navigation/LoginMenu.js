import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import Store from '../../context/Store';
import './loginMenu.scss'

const AuthForm = React.lazy(() => import('../form/AuthForm'))

const LoginMenu = () => {
    const { loginError, loginHandler, loginMenuToggle, signOut, user, loginMenuVisible } = useContext(Store)

    const [loginVisible, setLoginVisible] = useState(false)

    const loginToggle = () => {
        setLoginVisible(!loginVisible)
    }

    return (
        <div className={`login__menu-container ${loginMenuVisible ? 'visible' : ''} ${user.username ? '' : 'logged-out'}`}>
            <div className='login__menu-login-register'>
                {user && user.username ? 
                <h5 onClick={signOut}>Log out</h5>
                :
                (<>
                    <h5 onClick={loginToggle}>Login</h5>
                    <div className={`login__menu-auth__form ${loginVisible ? 'visible' : ''}`}>
                        <AuthForm 
                            loginError={loginError}
                            onSubmit={loginHandler} 
                            signup={false} 
                            hideRegisterButton={true}
                            user={false}
                            loginToggle={loginToggle}
                            LoginMenuToggle={loginMenuToggle}
                        />
                    </div>
                    <Link to='/signup'><h5 onClick={loginMenuToggle}>Register</h5></Link>
                </>)
                }
            </div>
        </div>
    )
}

export default LoginMenu