import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import NavBar from './components/navbar/NavBar'
import MainContainer from './pages/MainContainer'
import { handleLogin, handleSignup } from './helpers/Auth'

const App = () => {
  
  const [loginError, setLoginError] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [searchBarVisible, setSearchBarVisibility] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  const [singleWall, setSingleWall] = useState({})
  const [signUpFlag, setSignUpFlag] = useState(false)
  const [sortInputVisible, setSortInputVisibility] = useState(false)
  const [user, setUser] = useState({ username: null, userId: null, isAuth: false, token: '' })
  const [userPostCode, setUserPostCode] = useState('')
  const [walls, setWalls] = useState([])
  

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


  const loginHandler = async (event, authData) => {
    event.preventDefault();
    const loginResult = await handleLogin(authData)
    if (loginResult.isAuth) {
        setUser({username: loginResult.username, userId: loginResult.userId, isAuth: true, token: loginResult.token})
    } else {
      setLoginError(true)
      setTimeout(()=> {
        setLoginError(false)
      },500)
    }
  };

  const toggleSearchBar = () => {
    setSearchBarVisibility(!searchBarVisible)
    setSortInputVisibility(false)
  }

  const toggleSortInput = () => {
    setSortInputVisibility(!sortInputVisible)
    setSearchBarVisibility(false)
  }

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    const signupResult = await handleSignup(authData)
    if (signupResult.signupSuccess) window.location.assign("/")
  }

  const signOut = () => {
    setUser({username: null, userId: null, isAuth: false, token: ''})
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
  }

  const updateFilter = (e) => {
    setSearchFilter(e.target.value)
  }

  const clearFilter = (e) => {
    e.preventDefault()
    e.target.searchInput.value = ''
    setSearchFilter('')
  }

  const setPostCode = (postcode) => {
    const postcodeRegEx = /[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}/i; 
    if (!postcode) {
      setUserPostCode('')
      return {status: true}
    }
    const validPostcode = postcodeRegEx.test(postcode); 
    if (validPostcode) {
      setUserPostCode(postcode)
      return {status: true}
    }
    return {status: false, message: 'Postcode is invalid'}
  }

  const mobileMenuToggle = () => {
    setMobileMenuVisible(!mobileMenuVisible)
    console.log(mobileMenuVisible)
  }
  

  const filteredWalls = walls.filter(wall => wall.name.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || wall.region.toLowerCase().includes(searchFilter.toLocaleLowerCase()) || wall.city.toLowerCase().includes(searchFilter.toLocaleLowerCase())).sort((a, b) => (a.name > b.name) ? 1 : -1)

  return (
    <div className='app-main-container'>
      <div className='app-container'>
        <NavBar
          signOut={signOut}
          user={user}
          setSearchFilter={setSearchFilter}
          loginHandler={loginHandler}
          loginError={loginError}
          mobileMenuToggle={mobileMenuToggle}
          setSignUpFlag={setSignUpFlag}
        />
        <MainContainer
          userPostCode={userPostCode} 
          setUserPostCode={setPostCode}
          clearFilter={clearFilter}
          openSearchBar={toggleSearchBar}
          openSortInput={toggleSortInput}
          setWalls={setWalls}
          setSearchFilter={setSearchFilter}
          searchBarVisible={searchBarVisible}
          searchFilter={searchFilter}
          signOut={signOut}
          signupHandler={signupHandler}
          sortInputVisible={sortInputVisible}
          updateFilter={updateFilter}
          user={user}
          walls={filteredWalls}
          signUpFlag={signUpFlag}
          singleWall={singleWall}
          setSingleWall={setSingleWall}
        />
      </div>
    </div>
  );
}

export default withRouter(App)
