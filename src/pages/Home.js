import React, { useEffect } from 'react';
import API from '../helpers/API'
import WallCard from '../components/WallCard';
import SearchBar from '../components/SearchBar';
import { Helmet } from 'react-helmet'

const Home = ({ walls, setWalls, updateFilter, clearFilter, searchBarVisible, openSearchBar, openSortInput, signOut, sortInputVisible, user, userPostCode, setUserPostCode }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchWalls = async () => {
        const response = userPostCode ? await API.getWallsWithDistance(userPostCode).then(resp => resp.json()) : await API.getWalls().then(resp => resp.json())
        const data = response.data.walls || response.data.wallsWithDistance
        console.log(data.walls)
        if (!data.loggedIn && user.userId !== null) signOut()
        return setWalls(data.walls)
    }
    try{
        fetchWalls();
    } catch (err) {
        console.log(err)
    }

    }, [setWalls, user.userId, userPostCode]);

    const sortedWalls = walls.sort((a, b) => Number(a.distance) - Number(b.distance))


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
                    searchInputVisible={searchBarVisible}
                    sortInputVisible={sortInputVisible}
                    openSearchBar={openSearchBar}
                    openSort={openSortInput}
                    userPostCode={userPostCode} 
                    setUserPostCode={setUserPostCode}
                />
            </div>
            <div className='outer-card-container'>
                <div className='card-container'>
                    {sortedWalls.map(wall => <WallCard wall={wall} key={wall.id} />)}
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