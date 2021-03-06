import React, { useState, useEffect, Suspense, useContext } from 'react'
import { State } from '../context/Store'
import { Link } from 'react-router-dom';
import API from '../helpers/API'
import { Helmet } from 'react-helmet'
import './singlewall.scss'

// const CountUp = React.lazy(() => import('react-countup'))
// const GaugeChart = React.lazy(() => import('react-gauge-chart'))
// const ContactForm = React.lazy(() => import('../components/form/ContactForm'))
const ContentTabs = React.lazy(() => import('../components/singleWallComponents/contentTabs.js'))
const StarRatings = React.lazy(() => import('react-star-ratings'))
const ReviewForm = React.lazy(() => import('../components/form/reviewForm'))
const MapComponent = React.lazy(() => import('../components/singleWallComponents/map'))
const Reviews = React.lazy(() => import('../components/singleWallComponents/Reviews'))

const SingleWall = (props) => {
    const { user, signOut } = useContext(State)
    const [wall, setWall] = useState({})
    const [tabContent, setTabContent] = useState('description')
    const [reviewFormVisible, setReviewFormVisibility] = useState(false)
    const [editReviewFormVisible, setEditReviewFormVisibility] = useState(null)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        
        const fetchWall = async () => {
            const { wallSlug } = props.match.params;
            const response = await API.getWall(wallSlug).then(resp => resp.json())
            const data = response.data.singleWall
            if (user.userId !== null && !data.loggedIn) signOut()
            if (data.wall !== wall) {
                setWall(data.wall);
            }
        }
    try{
        fetchWall();
    } catch (err) {
        console.log(err)
    }

    }, [props.match.params.wallId]);

    const editReviewFormVisibleToggle = (reviewId) => {
        if (editReviewFormVisible === reviewId) {
            setEditReviewFormVisibility(null)
        } else {
            setReviewFormVisibility(false)
            setEditReviewFormVisibility(reviewId)
        }
    }

    const addReview = review => {
        window.location.reload()
    }

    let toggleVisible = () => {
        setReviewFormVisibility(!reviewFormVisible)
    }

    const deleteReview = async (reviewId) => {        
        const confirmation = window.confirm("Are you sure you want to delete your review?")
        if (confirmation) {
            const result = await API.deleteReview(reviewId, user.token)
            if (result) {
                const updatedWall = {...wall, reviews: wall.reviews.filter(review => review.id !== reviewId)}
                setWall(updatedWall)
            }
        }
    }

    const createEditPost = async (reviewData, editing, token) => {
        const review = await API.createEditReview(reviewData, editing, token)
            const updatedReviews = [review, ...wall.reviews.filter(rev => rev.id !== review.id)]
            const updatedWall = {...wall, reviews: updatedReviews}

            setReviewFormVisibility(false)
            setEditReviewFormVisibility(null)
            setWall(updatedWall)
    }

    const createHTMLdescription = () => {
       const desc = wall.description.split("`")
       if (desc.length > 1) return desc[1]
       return {__html: `<div>${wall.description}</div>`}
    }

    const alreadyReviewed = () => {
        const authorArray = wall.reviews.map(review => review.authorId)
        if (authorArray.includes(user.userId)) return true
        return false
    }

    return (
        <>
        {wall.name && (
            <>
            <Helmet>  {/* page title */}
                <title>{wall.name} | {wall.region} | Clambr </title>
            </Helmet>
            <div className='single__wall-container'>
                <div className='single__wall'>
                    <Link to='/'><p className='back-button'>Back to wall list</p></Link>
                    <div className='single__wall-heading'>
                        <div className="single__wall-title">
                            <h1>
                                {wall.name}
                            </h1>
                        </div>
                        <div className='single__wall-sub-heading'>
                            <div className='single__wall-reviews'>
                            <Suspense fallback={<div></div>}>
                                <StarRatings
                                    rating={1}
                                    starRatedColor="gold"
                                    numberOfStars={1}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="0px"
                                />
                            </Suspense>
                                {wall.reviews && wall.reviews.length > 0 ?
                                <>
                                    <h5>{wall.reviews.reduce((prev, cur) => { return prev + Number(cur.rating) }, 0) / wall.reviews.length}</h5>
                                    <p>({wall.reviews.length} review{wall.reviews.length > 1 && 's'})</p>
                                </>
                                :
                                <h5>No ratings yet</h5>}
                            </div>
                            <div className='single__wall-region'>📌{wall.region}</div>
                            {wall.boulderingOnly &&<div className='single__wall-bouldering-only'><strong><h5 style={{ color: 'red' }}>Bouldering Only</h5></strong></div>}
                        </div>
                    </div>
                    <div className='single__wall-image-container'>
                        <picture className='wall-image'>
                            <source srcSet={wall.imageUrl} type='image/webp'></source>
                            <source srcSet={wall.imageUrl.replace('webp', 'jpg').replace('/climbing-walls', '/climbing-walls/jpegs')} type='image/jpeg'></source>
                            <img src={wall.imageUrl.replace('webp', 'jpg').replace('/climbing-walls', '/climbing-walls/jpegs')} className='wall-image' alt="" />
                        </picture>
                    </div>
                    <div className='single__wall-information'>
                        <div className='single__wall-content'>
                            <div className='single__wall-center-details'>
                                <div className='single__wall-opening-hours'>
                                    <p><strong>Weekdays:</strong> Open: <strong>{wall.weekdayOpening}</strong> Close: <strong>{wall.weekdayClosing}</strong></p>
                                    <p><strong>Weekends:</strong> Open: <strong>{wall.weekendOpening}</strong> Close: <strong>{wall.weekendClosing}</strong></p>
                                        {wall.openingNotes && <p><strong>Notes:</strong> {wall.openingNotes}</p>}
                                    
                                </div>
                                <div className='single__wall-contact-details'>
                                    <p>📞 {wall.phone} </p>
                                    <p><a href={`mailto:${wall.email}`}> 📧 {wall.email} </a></p>
                                </div>
                            </div>
                            <div className='single__wall-tabbed-details'>
                                <ContentTabs 
                                    wall={wall}
                                    user={user}
                                    tabContent={tabContent}
                                    setTabContent={setTabContent}
                                    description={createHTMLdescription}
                                />
                            </div>
                            <div className='single__wall-reviews-section'>
                                <div className='review-form'>
                                    <button onClick={toggleVisible} className='toggle-review-form'>
                                        <strong>{!alreadyReviewed() && 'Post New Review'}</strong>
                                    </button>
                                    <Suspense fallback={<div></div>}>
                                        <ReviewForm
                                            user={user}
                                            wallId={wall.id}
                                            visible={alreadyReviewed() ? false : reviewFormVisible}
                                            editing={false}
                                            addReview={addReview}
                                            review={null}
                                            createEditPost={createEditPost}
                                        />
                                    </Suspense>
                                </div>
                                {(wall.reviews && wall.reviews.length > 0) ?
                                    (<div className='reviews'> 
                                        <Suspense fallback={<div></div>}>
                                            <Reviews
                                                wallId={wall.id}
                                                reviews={wall.reviews}
                                                user={user}
                                                editReviewFormVisible={editReviewFormVisible}
                                                addReview={addReview}
                                                createEditPost={createEditPost}
                                                editReviewFormVisibleToggle={editReviewFormVisibleToggle}
                                                deleteReview={deleteReview}
                                            />
                                        </Suspense>
                                    </div>)
                                    :
                                    <div className='reviews'> 
                                        <h4>No Reviews yet! Post a review to let others know your thoughts.</h4>
                                    </div> 
                                }
                            </div>
                        </div>
                        <div className='single__wall-location'>
                            {/* <div className='single__wall-climber-count'>
                            <Suspense fallback={<div></div>}>
                                <GaugeChart id="gauge-chart3" 
                                    nrOfLevels={30} 
                                    colors={["#4a7ce9", "#4a7ce9", "#4a7ce9", "#4a7ce9", "#FF5F6D" ]} 
                                    arcWidth={0.4} 
                                    percent={86/200} 
                                    hideText={true}
                                    animDelay={0}
                                />
                            </Suspense>
                                <h4>Current climber count </h4>
                            <Suspense fallback={<div></div>}>
                                <CountUp end={86} duration={5}/> of 200 climbers
                            </Suspense>
                            </div> */}
                            <div className='single__wall-map-location'>
                            <Suspense fallback={<div></div>}>
                                <MapComponent 
                                    isMarkerShown
                                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPSAPIKEY}&libraries=geometry,drawing,places`}
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `320px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    wallName={wall.name}
                                    postcode={wall.postcode}
                                    controlSize={10}
                                />
                            </Suspense>
                            </div>
                            <div className='single__wall-address'>
                                <p><strong>Address</strong><br />
                                {wall.addressLine1}<br />{wall.addressLine2 && <>{wall.addressLine2} <br /></>}{wall.addressLine3 && <>{wall.addressLine3} <br /></>}{wall.city}<br />{wall.postcode}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )}  
        </>   
    )
}

export default SingleWall