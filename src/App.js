import React, { useState, useEffect, Suspense, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './App.scss';
import NavBar from './components/navigation/NavBar'
import MainContainer from './components/MainContainer'
import { handleLogin, handleSignup } from './helpers/Auth'
import { State, Dispatch } from './context/Store';

const LoginMenu = React.lazy(() => import('./components/navigation/LoginMenu'))

const App = () => {
  const dispatch = useContext(Dispatch)
  const { walls, filterSelection, signUpSuccess} = useContext(State)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('userName')
    const postcode = localStorage.getItem('userPostcode')
    if (postcode) dispatch({ type: 'setPostCode', data: postcode })
    if (!token) {
      return;
    }
    dispatch({ type: 'setUser', data: {username, userId, token, isAuth: true} })
  }, [])

  async function loginHandler (event, authData) {
    event.preventDefault();
    const loginResult = await handleLogin(authData)
    if (loginResult.isAuth) {
        dispatch({type: 'setUser', data: {username: loginResult.username, userId: loginResult.userId, isAuth: true, token: loginResult.token}})
        dispatch({type: 'setLoginMenuVisible', data: false})
    } else {
        dispatch({type: 'setLoginError', data: true})
        setTimeout(()=> {
            dispatch({type: 'setLoginError', data: false})
        },500)
    }
  };

  
  async function signupHandler (event, authData) {
    event.preventDefault();
    const signupResult = await handleSignup(authData)
    if (signupResult.error) return signupResult
    if (signupResult.signupSuccess) {
      dispatch({type: 'setSignUpSuccess', data: true})
    }
  }

  const sortedWalls = walls.sort((a, b) => (a.name > b.name) ? 1 : -1);
  const filteredWalls = sortedWalls.filter(wall => {
    let selectedFilter = ''

    if (filterSelection.bouldering) selectedFilter = 'all'
    else if (!filterSelection.bouldering && !filterSelection.auto && (filterSelection.top || filterSelection.lead )) selectedFilter = 'ropesNoAuto'
    else if (!filterSelection.bouldering && (filterSelection.top || filterSelection.lead || filterSelection.auto)) selectedFilter = 'ropesAndAuto'
    else if (filterSelection.auto && (!filterSelection.top && !filterSelection.lead && !filterSelection.bouldering)) selectedFilter = 'autosOnly'
    
    switch (selectedFilter) {
      case 'all':
        return wall;
      case 'ropesAndAuto':
        if (wall.top || wall.lead || wall.auto) return wall;
        break;
      case 'ropesNoAuto':
        if (wall.top || wall.lead) return wall;
        break;
      case 'autosOnly':
        if (wall.auto) return wall;
        break;
      default:
        return wall
    }
  })


  return (
    <div className='app-main-container' >
      {signUpSuccess && <Redirect to={'/'} />}
      <div className='app-container'>
        <NavBar loginHandler={loginHandler}/>
        <Suspense fallback={<div></div>}>
          <LoginMenu loginHandler={loginHandler}/>
        </Suspense>
        <MainContainer walls={filteredWalls} signupHandler={signupHandler} />
      </div>
    </div>
  );
}

export default withRouter(App)