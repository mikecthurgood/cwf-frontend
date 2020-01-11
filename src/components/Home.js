import React, { useEffect } from 'react';
import API from '../helpers/API'
import WallCard from './WallCard';

const Home = ({ walls, setWalls }) => {

    useEffect(() => {
        API.getWalls().then(data => {
            setWalls(data)
            console.log(data)
        })

    }, [setWalls]);

    return (
        <div>
            <div className='search-box'>

            </div>
            <div className='card-container'>
                {walls.map(wall => <WallCard wall={wall} key={wall.id} />)}
            </div>

        </div>
    )

}

export default Home