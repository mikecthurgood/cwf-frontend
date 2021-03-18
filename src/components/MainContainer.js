import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'))
const AuthForm = React.lazy(() => import('./form/AuthForm'))
const SingleWall = React.lazy(() => import('../pages/singleWall'));
const ErrorPage = React.lazy(() => import('../pages/ErrorPage'));

const MainContainer = ({walls, signupHandler}) => (
        
    <div className='main-container'>
        <Switch>
            <Route exact path="/" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}>
                <Home {...routerProps} walls={walls} />
            </Suspense>} />
            <Route exact path="/signup" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}>
                <AuthForm {...routerProps} 
                    signup={true}
                    loginToggle={() => {}}
                    loginMenuToggle={() => {}}
                    signupHandler={signupHandler}
                />
            </Suspense>}/>
            <Route exact path="/walls/:wallSlug" render={(routerProps) => <Suspense fallback={<div>Loading...</div>}>
                <SingleWall {...routerProps} /> 
            </Suspense>}/>
            <Route path='*' render={(routerProps) => <Suspense fallback={<div>Loading...</div>}>
                <ErrorPage />
            </Suspense>}/>
        </Switch>
    </div>
)

export default MainContainer