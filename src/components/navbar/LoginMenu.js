import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './loginMenu.scss'

const AuthForm = React.lazy(() => import('../form/AuthForm'))


const MobileMenu = ({ loginError, loginHandler, loginMenuToggle, signOut, user, visible }) => {

    const [loginVisible, setLoginVisible] = useState(false)

    const loginToggle = () => {
        setLoginVisible(!loginVisible)
    }

    return (
        <div className={`login__menu-container ${visible ? 'visible' : ''} ${user.username ? '' : 'logged-out'}`}>
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
                            setSignUpFlag={false} 
                            user={false}
                            loginToggle={loginToggle}
                            mobileMenuToggle={loginMenuToggle}
                        />
                    </div>
                    <Link to='/signup'><h5 onClick={loginMenuToggle}>Register</h5></Link>
                </>)
                }
            </div>
        </div>
    )
}

export default MobileMenu