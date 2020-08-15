import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import NavBar from './components/navbar/NavBar'
import MainContainer from './pages/MainContainer'
import { handleLogin, handleSignup } from './helpers/Auth'

const App = () => {

  const [user, setUser] = useState({ username: null, userId: null, isAuth: false, token: '' })
  const [walls, setWalls] = useState([])
  const [singleWall, setSingleWall] = useState({})
  const [signUpFlag, setSignUpFlag] = useState(false)
  
  const [searchFilter, setSearchFilter] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('userName')
        if (!token) {
          console.log('no token stored')
          return;
    }
    setUser({username, userId, token, isAuth: true})
  }, [])

  // const fetchSingleWall = async (wallId) => {
  //   const response = await API.getWall(wallId).then(resp => resp.json())
  //   const data = response.data.singleWall
  //   console.log(data)
  //   console.log(user)
  //   if (!data.loggedIn && user.userId) {
  //       signOut()
  //   }
  //   setSingleWall(data.wall);
  // }

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    const loginResult = await handleLogin(authData)
    console.log('login handler--------------', loginResult)
    if (loginResult.isAuth) {
        setUser({username: loginResult.username, userId: loginResult.userId, isAuth: true, token: loginResult.token})
    }
  };

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    const signupResult = await handleSignup(authData)
    if (signupResult.signupSuccess) window.location.assign("/login")
  }

  // const signIn = userData => {
  //   localStorage.setItem('token', userData.token)
  //   setUser({ username: userData.user.username })
  // }

  const signOut = () => {
    setUser({username: null, userId: null, isAuth: false, token: ''})
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
  }

  const updateFilter = (e) => {
    setSearchFilter(e.target.value)
  }

  const clearFilter = (e = null) => {
    e.preventDefault()
    e.target.searchInput.value = ''
    setSearchFilter('')
  }

  const filteredWalls = walls.filter(wall => wall.name.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || wall.region.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || wall.city.toLowerCase().includes(searchFilter.toLocaleLowerCase())).sort((a, b) => (a.name > b.name) ? 1 : -1)

  return (
    <div className='main-container'>
      <NavBar
        // signInTest={signInTest}
        signOut={signOut}
        user={user}
        setSearchFilter={setSearchFilter}
        loginHandler={loginHandler}
        setSignUpFlag={setSignUpFlag}
      />
      <MainContainer
        clearFilter={clearFilter}
        loginHandler={loginHandler}
        setWalls={setWalls}
        setSearchFilter={setSearchFilter}
        searchFilter={searchFilter}
        signOut={signOut}
        signupHandler={signupHandler}
        updateFilter={updateFilter}
        user={user}
        walls={filteredWalls}
        signUpFlag={signUpFlag}
        singleWall={singleWall}
        setSingleWall={setSingleWall}
        // fetchSingleWall={fetchSingleWall}
      />
    </div>
  );
}

export default withRouter(App)
