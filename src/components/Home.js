import React, { useEffect } from 'react';
import API from '../helpers/API'
import WallCard from './WallCard';
import SearchBar from './SearchBar';


const Home = ({ walls, setWalls, updateFilter, clearFilter }) => {

    useEffect(() => {
        API.getWalls().then(data => {
            setWalls(data)
            console.log(data)
        })

    }, [setWalls]);

    return (
        <div>
            <div className='search-box'>
                <SearchBar
                    updateFilter={updateFilter}
                    clearFilter={clearFilter}
                />
            </div>
            <div className='card-container'>
                {walls.map(wall => <WallCard wall={wall} key={wall.id} />)}
            </div>

        </div>
    )

}

export default Home