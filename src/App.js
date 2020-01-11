import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import API from './helpers/API'
import './App.scss';
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'

const App = () => {

  const [user, setUser] = useState({ username: null })
  const [walls, setWalls] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    token ?
      API.validate()
        .then(data => {
          if (data.error) throw Error(data.error)
          localStorage.setItem('token', data.token)
          setUser({ username: data.user.username })
          console.log(data.user)
        })
        .catch(error => {
          console.log(error)
          localStorage.removeItem('token')
        })
      :
      console.log('no token stored')
  }, [])

  const signIn = userData => {
    localStorage.setItem('token', userData.token)
    setUser({ username: userData.user.username })
  }

  const signInTest = () => API.signIn('MikeTest', 'm').then(data => signIn(data))

  const signOut = () => {
    setUser({})
    localStorage.removeItem('token')
  }

  // code for throwing error if user not found for JS side
  //   .then(data => {
  //     if (data.error) throw Error(data.error)
  //   })

  return (
    <>
      <NavBar
        signInTest={signInTest}
        signOut={signOut}
        user={user}
      />
      <MainContainer
        walls={walls}
        setWalls={setWalls}
      />
    </>
  );
}

export default withRouter(App)
