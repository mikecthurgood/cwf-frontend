import React, { useState, useEffect, Suspense } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import './App.scss';
import NavBar from './components/navigation/NavBar'
import MainContainer from './components/MainContainer'
import { handleLogin, handleSignup } from './helpers/Auth'
import Store from './context/Store';

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
  const [signUpSuccess, setSignUpSuccess] = useState(false)
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

  async function loginHandler (event, authData) {
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

  function toggleSearchBar () {
    setSearchBarVisibility(!searchBarVisible)
    setSortInputVisibility(false)
  }

  function toggleSortInput () {
    setSortInputVisibility(!sortInputVisible)
    setSearchBarVisibility(false)
  }

  async function signupHandler (event, authData) {
    event.preventDefault();
    const signupResult = await handleSignup(authData)
    if (signupResult.error) return signupResult
    if (signupResult.signupSuccess) {
      setSignUpSuccess(true)
    }
  }

  function signOut () {
    setUser({username: null, userId: null, isAuth: false, token: ''})
    localStorage.removeItem('token')
    localStorage.removeItem('userName')
    localStorage.removeItem('userId')
    setMobileMenuVisible(false)
    setLoginMenuVisible(false)
  }

  function updateFilter (e) {
    setSearchFilter(e.target.value)
  }

  function clearFilter (e) {
    e.preventDefault()
    e.target.searchInput.value = ''
    setSearchFilter('')
  }

  function setPostCode (postcode) {
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

  function mobileMenuToggle () {
    setMobileMenuVisible(!mobileMenuVisible)
  }

  function loginMenuToggle () {
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

  const contextData = {
    clearFilter,
    filterSelection,
    loginError,
    loginHandler,
    loginMenuToggle,
    loginMenuVisible,
    mobileMenuToggle,
    mobileMenuVisible,
    scrollPosition,
    searchBarVisible,
    searchFilter,
    setFilterSelection,
    setPostCode,
    setScrollPosition,
    setSearchFilter,
    setSignUpSuccess,
    setSingleWall,
    setWalls,
    signOut,
    signupHandler,
    signUpSuccess,
    singleWall,
    sortInputVisible,
    toggleSearchBar,
    toggleSortInput,
    updateFilter,
    user,
    userPostCode,
  }

  return (
    <Store.Provider value={contextData} >
      <div className='app-main-container' >
        {signUpSuccess && <Redirect to={'/'} />}
        <div className='app-container'>
          <NavBar />
          {/* <Suspense fallback={<div></div>}>
            <MobileMenu />
          </Suspense> */}
          <Suspense fallback={<div></div>}>
            <LoginMenu />
          </Suspense>
          <MainContainer walls={filteredWalls} />
        </div>
      </div>
    </Store.Provider>
  );
}

export default withRouter(App)
