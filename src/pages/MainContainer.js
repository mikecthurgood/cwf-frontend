import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './Home'
import SingleWall from './singleWall';
import AuthForm from '../components/form/AuthForm'

const MainContainer = ({ walls, setWalls, updateFilter, clearFilter, user, loginHandler, signUpFlag, signupHandler, signOut }) => (
    <div className='main-container'>
        <Switch>
        <Route exact path="/" render={(routerProps) => <Home
            {...routerProps}
            walls={walls}
            setWalls={setWalls}
            updateFilter={updateFilter}
            clearFilter={clearFilter}
            signOut={signOut}
            user={user}
        />} />
        {/* <Route exact path="/login" render={(routerProps) => <AuthForm {...routerProps} onSubmit={loginHandler} signup={false} user={user} />}/> */}
        <Route exact path="/signup" render={(routerProps) => <AuthForm {...routerProps} onSubmit={signupHandler} signup={true} user={user} />}/>
        <Route exact path="/:wallSlug" render={(routerProps) => <SingleWall {...routerProps} signOut={signOut} user={user} />}/>
        </Switch>
    </div>
)

export default MainContainer