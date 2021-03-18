import React, { useEffect, Suspense, useContext } from 'react';
import API from '../helpers/API'
import { Helmet } from 'react-helmet'
import { State, Dispatch } from '../context/Store';

const WallCard = React.lazy(() => import('../components/homePageComponents/WallCard'));
const FilterMenu = React.lazy(() => import('../components/sortAndFilter/FilterMenu'));
const SignUpSuccessModal = React.lazy(() => import('../components/homePageComponents/SignUpSuccess.js'))

const Home = ({walls}) => {

    const dispatch = useContext(Dispatch)
    const { signOut, signUpSuccess, user, userPostCode } = useContext(State)

    useEffect(() => {
        const fetchWalls = async () => {
        const response = userPostCode ? await API.getWallsWithDistance(userPostCode).then(resp => resp.json()) : await API.getWalls().then(resp => resp.json())
        const data = response.data.walls || response.data.wallsWithDistance
        if (!data.loggedIn && user.userId !== null) signOut()
        return dispatch({type: 'setWalls', data: data.walls })
    }
    try{
        fetchWalls();
    } catch (err) {
        console.log(err)
    }

    }, [user.userId, userPostCode]);

    const sortedWalls = walls ? walls.sort((a, b) => Number(a.distance) - Number(b.distance)) : {}

    function setScrollPosition (data) {
        dispatch({ type: 'setScrollPosition', data})
    }

    function clearSignUpSuccess () {
        dispatch({type: 'setSignUpSuccess', data: false})
    }

    return (
        <>
            <Helmet>
                <title> Clambr | Find a climbing wall in London</title>
            </Helmet>
        <div>
            <div className='secondary-nav'>
            <Suspense fallback={<div></div>}>
                <FilterMenu />
            </Suspense>
            </div>
            <Suspense fallback={<></>}>
                {signUpSuccess && <SignUpSuccessModal clearSignUpSuccess={clearSignUpSuccess} />}
            </Suspense>
            {userPostCode && (
                <div className='postcode-information'>
                    <p>Sorted by distance from <strong>{userPostCode.toUpperCase()}</strong></p>
                </div>
            )}
            <div className='outer-card-container'>
                <div className='card-container'>
                    {sortedWalls.length === 0 && (<div>Loading Walls...</div>)}
                    {sortedWalls.length > 0 && sortedWalls.map(wall => <Suspense key={`${wall.id} suspense`} fallback={<div></div>}>
                        <WallCard wall={wall} key={wall.id} setScrollPosition={setScrollPosition} /></Suspense>)}
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