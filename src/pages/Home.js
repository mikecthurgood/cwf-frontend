import React, { useEffect, Suspense } from 'react';
import API from '../helpers/API'
import { Helmet } from 'react-helmet'

const WallCard = React.lazy(() => import('../components/homePageComponents/WallCard'));
const SearchBar = React.lazy(() => import('../components/sortAndFilter/SearchBar'));

const Home = ({ walls, setWalls, updateFilter, clearFilter, searchFilter, searchBarVisible, openSearchBar, openSortInput, signOut, sortInputVisible, user, userPostCode, setUserPostCode }) => {

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchWalls = async () => {
        const response = userPostCode ? await API.getWallsWithDistance(userPostCode).then(resp => resp.json()) : await API.getWalls().then(resp => resp.json())
        const data = response.data.walls || response.data.wallsWithDistance
        if (!data.loggedIn && user.userId !== null) signOut()
        return setWalls(data.walls)
    }
    try{
        fetchWalls();
    } catch (err) {
        console.log(err)
    }

    }, [setWalls, user.userId, userPostCode]);

    const sortedWalls = walls ? walls.sort((a, b) => Number(a.distance) - Number(b.distance)) : {}


    return (
        <>
            <Helmet>
                <title> Clambr | Find a climbing wall in London</title>
            </Helmet>
        <div>
            <div className='search-box'>
            <Suspense fallback={<div></div>}>
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
            </Suspense>
            </div>
            <div className='outer-card-container'>
                <div className='card-container'>
                    {searchFilter.length < 1 && sortedWalls.length === 0 && (<div>Loading Walls...</div>)}
                    {sortedWalls.length > 0 ? sortedWalls.map(wall => <Suspense key={`${wall.id} suspense`} fallback={<div></div>}><WallCard wall={wall} key={wall.id} /></Suspense>) : searchFilter.length > 0 && <div className='wall-card-none-found'><h3>No walls match your search</h3></div>}
                    {sortedWalls.length > 0 && (<>
                        <div className='wall-card-placeholder'></div>
                        <div className='wall-card-placeholder'></div>
                        <div className='wall-card-placeholder'></div>
                        <div className='wall-card-placeholder'></div>
                        <div className='wall-card-placeholder'></div></>)}
                </div>
            </div>

        </div>
        </>
    )

}

export default Home