import React, { useEffect } from 'react';
import API from '../helpers/API'
import WallCard from './WallCard';

const Home = ({ walls, setWalls }) => {

    useEffect(() => {
        API.getWalls().then(data => setWalls(data))
    }, []);

    return (
        <div>
            <div className='card-container'>
                {walls.map(wall => <WallCard wall={wall} />)}
            </div>

        </div>
    )

}

export default Home