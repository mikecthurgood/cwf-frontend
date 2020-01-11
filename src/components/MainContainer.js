import React from 'react'
import { Route } from 'react-router-dom';
import Home from './Home'

const MainContainer = ({ walls, setWalls }) => (
    <div className='main-container'>
        <Route exact path="/" render={(routerProps) => <Home
            {...routerProps}
            walls={walls}
            setWalls={setWalls}
        />} />
    </div>
)

export default MainContainer