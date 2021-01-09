import React, { useEffect, Suspense, useContext } from 'react';
import API from '../helpers/API'
import { Helmet } from 'react-helmet'
import Store from '../context/Store';

const WallCard = React.lazy(() => import('../components/homePageComponents/WallCard'));
const FilterMenu = React.lazy(() => import('../components/sortAndFilter/FilterMenu'));
const SignUpSuccessModal = React.lazy(() => import('../components/homePageComponents/SignUpSuccess.js'))


const Home = ({walls}) => {

    const { filterSelection, searchFilter, setFilterSelection, setScrollPosition, setSignUpSuccess, setPostCode, setWalls, signOut, signUpSuccess, user, userPostCode } = useContext(Store)

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
                    setUserPostCode={setPostCode}
                />
            </Suspense>
            </div>
            <Suspense fallback={<></>}>
                {signUpSuccess && <SignUpSuccessModal setSignUpSuccess={setSignUpSuccess}/>}
            </Suspense>
            {userPostCode && (
                <div className='postcode-information'>
                    <p>Sorted by distance from <strong>{userPostCode.toUpperCase()}</strong></p>
                </div>
            )}
            <div className='outer-card-container'>
                <div className='card-container'>
                    {searchFilter.length < 1 && sortedWalls.length === 0 && (<div>Loading Walls...</div>)}
                    {sortedWalls.length > 0 ? sortedWalls.map(wall => <Suspense key={`${wall.id} suspense`} fallback={<div></div>}>
                        <WallCard wall={wall} key={wall.id} setScrollPosition={setScrollPosition} /></Suspense>) : searchFilter.length > 0 && <div className='wall-card-none-found'><h3>No walls match your search</h3></div>}
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