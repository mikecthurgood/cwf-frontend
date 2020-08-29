import React, { useState, useEffect, Suspense } from 'react';
import { withRouter } from 'react-router-dom';
import './App.scss';
import NavBar from './components/navigation/NavBar'
import MainContainer from './components/MainContainer'
import { handleLogin, handleSignup } from './helpers/Auth'

const MobileMenu = React.lazy(() => import('./components/navigation/MobileMenu'))
const LoginMenu = React.lazy(() => import('./components/navigation/LoginMenu'))

const App = () => {
  
  const [filterSelection, setFilterSelection ] = useState({top: true, bouldering: true, auto: true, lead: true})
  const [loginError, setLoginError] = useState(false)
  const [loginMenuVisible, setLoginMenuVisible] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)
  const [searchBarVisible, setSearchBarVisibility] = useState(false)
  const [searchFilter, setSearchFilter] = useState('')
  const [scrollPosition, setScrollPosition] = useState(0)
  const [signUpSuccess, setSignupSuccess] = useState(false)
  const [singleWall, setSingleWall] = useState({})
  const [sortInputVisible, setSortInputVisibility] = useState(false)
  const [user, setUser] = useState({ username: null, userId: null, isAuth: false, token: '' })
  const [userPostCode, setUserPostCode] = useState('')
  const [walls, setWalls] = useState([])
  

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const username = localStorage.getItem('userName')
    const postcode = localStorage.getItem('userPostcode')
    if (postcode) setPostCode(postcode)  
    if (!token) {
      return;
    }
    setUser({username, userId, token, isAuth: true})
  }, [])

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    const loginResult = await handleLogin(authData)
    if (loginResult.isAuth) {
        setUser({username: loginResult.username, userId: loginResult.userId, isAuth: true, token: loginResult.token})
        setMobileMenuVisible(false)
        setLoginMenuVisible(false)
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
    console.log('signupResult------------', signupResult)
    if (signupResult.error) return signupResult
    if (signupResult.signupSuccess) {
      setSignupSuccess(true)
      setTimeout(() => {
        setSignupSuccess(false)
      }, 10000)
      window.location.assign("/")
    }
  }

  const signOut = () => {
    setUser({username: null, userId: null, isAuth: false, token: ''})
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    setMobileMenuVisible(false)
    setLoginMenuVisible(false)
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
      localStorage.removeItem('userPostcode')
      return {status: true}
    }
    const validPostcode = postcodeRegEx.test(postcode); 
    if (validPostcode) {
      setUserPostCode(postcode)
      localStorage.setItem('userPostcode', postcode)
      return {status: true}
    }
    return {status: false, message: 'Postcode is invalid'}
  }

  const mobileMenuToggle = () => {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  const loginMenuToggle = () => {
    setLoginMenuVisible(!loginMenuVisible)
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
      <div className='app-container'>
        <NavBar
          signOut={signOut}
          user={user}
          setSearchFilter={setSearchFilter}
          loginHandler={loginHandler}
          loginError={loginError}
          mobileMenuToggle={mobileMenuToggle}
          loginMenuToggle={loginMenuToggle}
        />
         <Suspense fallback={<div></div>}>
          <MobileMenu 
            loginError={loginError}
            loginHandler={loginHandler}
            mobileMenuToggle={mobileMenuToggle}
            signOut={signOut}
            user={user}
            visible={mobileMenuVisible}
          />
        </Suspense>
        <Suspense fallback={<div></div>}>
          <LoginMenu 
            loginError={loginError}
            loginHandler={loginHandler}
            loginMenuToggle={loginMenuToggle}
            signOut={signOut}
            user={user}
            visible={loginMenuVisible}
          />
        </Suspense>
        <MainContainer
          userPostCode={userPostCode} 
          filterSelection={filterSelection}
          setFilterSelection={setFilterSelection}
          setUserPostCode={setPostCode}
          clearFilter={clearFilter}
          openSearchBar={toggleSearchBar}
          openSortInput={toggleSortInput}
          scrollPosition={scrollPosition}
          setScrollPosition={setScrollPosition}
          setWalls={setWalls}
          setSearchFilter={setSearchFilter}
          searchBarVisible={searchBarVisible}
          searchFilter={searchFilter}
          signUpSuccess={signUpSuccess}
          signOut={signOut}
          signupHandler={signupHandler}
          sortInputVisible={sortInputVisible}
          updateFilter={updateFilter}
          user={user}
          walls={filteredWalls}
          singleWall={singleWall}
          setSingleWall={setSingleWall}
        />
      </div>
    </div>
  );
}

export default withRouter(App)
