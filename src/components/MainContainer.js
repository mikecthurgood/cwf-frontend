import React from 'react'
import { Route } from 'react-router-dom';
import Home from './Home'

const MainContainer = ({ walls, setWalls, updateFilter, clearFilter }) => (
    <div className='main-container'>
        <Route exact path="/" render={(routerProps) => <Home
            {...routerProps}
            walls={walls}
            setWalls={setWalls}
            updateFilter={updateFilter}
            clearFilter={clearFilter}
        />} />
    </div>
)

export default MainContainer