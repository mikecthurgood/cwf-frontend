import React, { useEffect, Suspense } from 'react';
import API from '../helpers/API'
import { Helmet } from 'react-helmet'

const WallCard = React.lazy(() => import('../components/homePageComponents/WallCard'));
const FilterMenu = React.lazy(() => import('../components/sortAndFilter/FilterMenu'));

const Home = ({ setScrollPosition, scrollPosition, filterSelection, setFilterSelection, walls, setWalls, updateFilter, clearFilter, searchFilter, searchBarVisible, openSearchBar, openSortInput, signOut, sortInputVisible, user, userPostCode, setUserPostCode }) => {

    useEffect(() => {
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
            <div className='secondary-nav'>
            <Suspense fallback={<div></div>}>
                <FilterMenu
                    filterSelection={filterSelection}
                    setFilterSelection={setFilterSelection}
                    userPostCode={userPostCode} 
                    setUserPostCode={setUserPostCode}
                />
            </Suspense>
            </div>
            {userPostCode && (
                <div className='postcode-information'>
                    <p>Sorted by distance from <strong>{userPostCode.toUpperCase()}</strong></p>
                </div>
            )}
            <div className='outer-card-container'>
                <div className='card-container'>
                    {searchFilter.length < 1 && sortedWalls.length === 0 && (<div>Loading Walls...</div>)}
                    {sortedWalls.length > 0 ? sortedWalls.map(wall => <Suspense key={`${wall.id} suspense`} fallback={<div></div>}><WallCard wall={wall} key={wall.id} setScrollPosition={setScrollPosition} /></Suspense>) : searchFilter.length > 0 && <div className='wall-card-none-found'><h3>No walls match your search</h3></div>}
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