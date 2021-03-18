import React, { useReducer } from  'react';
import reducer from './Reducer'

const initialState = {
    filterSelection: {top: true, bouldering: true, auto: true, lead: true},
    loginError: false,
    loginMenuVisible: false,
    mobileMenuVisible: false,
    searchBarVisible: false,
    scrollPosition: 0,
    signUpSuccess: false,
    singleWall: {},
    sortInputVisible: false,
    user: { username: null, userId: null, isAuth: false, token: '' },
    userPostCode: '',
    walls: [],
}

const State = React.createContext(initialState)
const Dispatch = React.createContext(null)

const Store = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <Dispatch.Provider value={dispatch} >
            <State.Provider value={state} >
                {children}
            </State.Provider>
        </Dispatch.Provider>
    )
}


export { State, Dispatch, Store }

