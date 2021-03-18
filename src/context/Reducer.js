const reducer = (state, action) => {
    switch (action.type) {
        
        case 'setFilterSelection':
            return { ...state, filterSelection: action.data}
        case 'setLoginError':
            return { ...state, loginError: action.data}
        case 'setLoginMenuVisible':
            return { ...state, loginMenuVisible: action.data}
        case 'setMobileMenuVisible':
            return { ...state, mobileMenuVisible: action.data}
        case 'setSearchBarVisibility':
            return { ...state, searchBarVisible: action.data}
        case 'setSearchFilter':
            return { ...state, searchFilter: action.data}
        case 'setScrollPosition':
            return { ...state, scrollPosition: action.data}
        case 'setSignUpSuccess':
            return { ...state, signUpSuccess: action.data}
        case 'setSingleWall':
            return { ...state, singleWall: action.data}
        case 'setSortInputVisibility':
            return { ...state, sortInputVisible: action.data}
        case 'setUser':
            return { ...state, user: action.data}
        case 'setPostCode':
            return { ...state, userPostCode: action.data}
        case 'setWalls':
            return { ...state, walls: action.data}
        case 'signOut' :
            localStorage.removeItem('token')
            localStorage.removeItem('userName')
            localStorage.removeItem('userId')
            return { 
                ...state,
                user: {username: null, userId: null, isAuth: false, token: ''},
                mobileMenuVisible: false,
                loginMenuVisible: false
            }
        default: 
            throw new Error('Invalid action type dispatched')
    }
}
export default reducer