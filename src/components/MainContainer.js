import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'))
const AuthForm = React.lazy(() => import('./form/AuthForm'))
const SingleWall = React.lazy(() => import('../pages/singleWall'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));

const MainContainer = ({ filterSelection, scrollPosition, setScrollPosition, setSignUpSuccess, signUpSuccess, setFilterSelection, walls, setWalls, user, setUserPostCode, signupHandler, signOut,  userPostCode, searchFilter }) => (
    <div className='main-container'>
        <Switch>
            <Route exact path="/" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}><Home
                {...routerProps}
                filterSelection={filterSelection}
                scrollPosition={scrollPosition}
                setScrollPosition={setScrollPosition}
                setWalls={setWalls}
                searchFilter={searchFilter}
                signOut={signOut}
                user={user}
                walls={walls}
                userPostCode={userPostCode} 
                setFilterSelection={setFilterSelection}
                setUserPostCode={setUserPostCode}
                setSignUpSuccess={setSignUpSuccess}
                signUpSuccess={signUpSuccess}
            /></Suspense>} />
            <Route exact path="/signup" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}>
                <AuthForm {...routerProps} 
                    onSubmit={signupHandler} 
                    signup={true} 
                    user={user} 
                    loginToggle={() => {}}
                    loginMenuToggle={() => {}}
                />
            </Suspense>}/>
            <Route exact path="/walls/:wallSlug" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}><SingleWall {...routerProps} signOut={signOut} user={user} /> </Suspense>}/>
            <Route path='*' render={(routerProps) => <Suspense fallback={<div>Loading...</div>}><ErrorPage /> </Suspense>}/>
        </Switch>
    </div>
)

export default MainContainer