import React, { useEffect } from 'react';
import API from '../helpers/API'
import WallCard from '../components/WallCard';
import SearchBar from '../components/SearchBar';
import { Helmet } from 'react-helmet'

const Home = ({ walls, setWalls, updateFilter, clearFilter, signOut, user }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchWalls = async () => {
        const response = await API.getWalls().then(resp => resp.json())
        const data = response.data.walls
        console.log(data)
        if (!data.loggedIn && user.userId !== null) signOut()
        setWalls(data.walls);
    }
    try{
        fetchWalls();
    } catch (err) {
        console.log(err)
    }

    }, [setWalls, user.userId]);

    return (
        <>
            <Helmet>
                <title> Clambr | Find a climbing wall in London</title>
            </Helmet>
        <div>
            <div className='search-box'>
                <SearchBar
                    updateFilter={updateFilter}
                    clearFilter={clearFilter}
                />
            </div>
            <div className='outer-card-container'>
                <div className='card-container'>
                    {walls.map(wall => <WallCard wall={wall} key={wall.id} />)}
                    <div className='wall-card-placeholder'></div>
                    <div className='wall-card-placeholder'></div>
                    <div className='wall-card-placeholder'></div>
                    <div className='wall-card-placeholder'></div>
                    <div className='wall-card-placeholder'></div>
                </div>
            </div>

        </div>
        </>
    )

}

export default Home