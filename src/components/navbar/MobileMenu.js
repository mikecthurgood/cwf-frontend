import React, { useState, Suspense } from 'react'
import { Link } from 'react-router-dom';
import './mobileMenu.scss'

const AuthForm = React.lazy(() => import('../form/AuthForm'))


const MobileMenu = ({ loginError, loginHandler, mobileMenuToggle, signOut, user, visible }) => {

    const [loginVisible, setLoginVisible] = useState(false)

    const loginToggle = () => {
        setLoginVisible(!loginVisible)
    }

    return (
        <div className={`mobile__menu-container ${visible ? 'visible' : ''} ${user.username ? 'full-width' : ''}`}>
            <div className='mobile__menu-login-register'>
                {user && user.username ? 
                <h5 onClick={signOut}>Log out</h5>
                :
                (<>
                    <h5 onClick={loginToggle}>Login</h5>
                    <div className={`mobile__menu-auth__form ${loginVisible ? 'visible' : ''}`}>
                        <AuthForm 
                            loginError={loginError}
                            onSubmit={loginHandler} 
                            signup={false} 
                            hideRegisterButton={true}
                            setSignUpFlag={false} 
                            user={false}
                            loginToggle={loginToggle}
                            mobileMenuToggle={mobileMenuToggle}
                        />
                    </div>
                    <Link to='/signup'><h5 onClick={mobileMenuToggle}>Register</h5></Link>
                </>)
                }
            </div>
        </div>
    )
}

export default MobileMenu