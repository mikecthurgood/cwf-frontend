import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'))
const AuthForm = React.lazy(() => import('./form/AuthForm'))
const SingleWall = React.lazy(() => import('../pages/singleWall'));

const MainContainer = ({ filterSelection, setFilterSelection, walls, setWalls, updateFilter, clearFilter, user, loginHandler, openSearchBar, openSortInput, searchBarVisible, setUserPostCode, signUpFlag, signupHandler, signOut, sortInputVisible, userPostCode, searchFilter }) => (
    <div className='main-container'>
        <Switch>
            <Route exact path="/" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}><Home
                {...routerProps}
                clearFilter={clearFilter}
                filterSelection={filterSelection}
                openSearchBar={openSearchBar}
                openSortInput={openSortInput}
                searchBarVisible={searchBarVisible}
                sortInputVisible={sortInputVisible}
                setWalls={setWalls}
                searchFilter={searchFilter}
                signOut={signOut}
                updateFilter={updateFilter}
                user={user}
                walls={walls}
                userPostCode={userPostCode} 
                setFilterSelection={setFilterSelection}
                setUserPostCode={setUserPostCode}
            /></Suspense>} />
            <Route exact path="/signup" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}><AuthForm {...routerProps} onSubmit={signupHandler} signup={true} user={user} /></Suspense>}/>
            <Route exact path="/:wallSlug" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}><SingleWall {...routerProps} signOut={signOut} user={user} /> </Suspense>}/>
        </Switch>
    </div>
)

export default MainContainer