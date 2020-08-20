import React, { useState, useEffect } from 'react'
import API from '../helpers/API'
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/form/reviewForm'
import MapComponent from '../components/map'
import GaugeChart from 'react-gauge-chart'
import CountUp from 'react-countup';
import Reviews from '../components/Reviews'
import ContactForm from '../components/form/ContactForm'
import { Helmet } from 'react-helmet'

import './singlewall.scss'

const SingleWall = (props) => {
    
    const [wall, setWall] = useState({})
    const [tabContent, setTabContent] = useState('description')
    const [reviewFormVisible, setReviewFormVisibility] = useState(false)
    const [editReviewFormVisible, setEditReviewFormVisibility] = useState(null)
    
    useEffect(() => {
        window.scrollTo(0, 0)
        
        const fetchWall = async () => {
            const response = await API.getWall(props.match.params.wallSlug).then(resp => resp.json())
            const data = response.data.singleWall
            if (props.user.userId !== null && !data.loggedIn) props.signOut()
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
            const result = await API.deleteReview(reviewId, props.user.token)
            if (result) {
                const updatedWall = {...wall, reviews: wall.reviews.filter(review => review.id !== reviewId)}
                setWall(updatedWall)
            }
        }
    }

    const createEditPost = async (reviewData, editing, token) => {
        const review = await API.createEditReview(reviewData, editing, token)
        // if (!editing) {
            const updatedReviews = [review, ...wall.reviews.filter(rev => rev.id !== review.id)]
            const updatedWall = {...wall, reviews: updatedReviews}

            setReviewFormVisibility(false)
            setEditReviewFormVisibility(null)
            setWall(updatedWall)
        // } else {
        //     const updatedReviews = [review, ...wall.reviews]
        //     const updatedWall = {...wall, reviews: updatedReviews}
        // }
    }

    const createHTMLdescription = () => {
       const desc = wall.description.split("`")
       if (desc.length > 1) return desc[1]
       return {__html: `<div>${wall.description}</div>`}
    }

    const alreadyReviewed = () => {
        const authorArray = wall.reviews.map(review => review.authorId)
        if (authorArray.includes(props.user.userId)) return true
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
                    <div className='single__wall-heading'>
                        <div className="single__wall-title">
                            <h1>
                                {wall.name}
                            </h1>
                        </div>
                        <div className='single__wall-sub-heading'>
                            <div className='single__wall-reviews'>
                                <StarRatings
                                    rating={1}
                                    starRatedColor="gold"
                                    // changeRating={this.changeRating}
                                    numberOfStars={1}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="0px"
                                />
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
                        <img src={wall.imageUrl} className='wall-image' alt="" />
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
                                <div className='single__wall-tabs'>
                                    <span className={`single__wall-tab ${tabContent === 'description' && 'selected'}`} onClick={() => setTabContent('description')}><h4>Description</h4></span>
                                    <span className={`single__wall-tab ${tabContent === 'facilities' && 'selected'}`} onClick={() => setTabContent('facilities')}><h4>Facilities</h4></span>
                                    <span className={`single__wall-tab ${tabContent === 'contact-form' && 'selected'}`} onClick={() => setTabContent('contact-form')}><h4>Get In Touch</h4></span>
                                </div>
                                <div className='single__wall-tab-content'>
                                    <div className={`single__wall-description ${tabContent === 'description' && 'visible'}`} dangerouslySetInnerHTML={createHTMLdescription()}>
                                    </div>
                                    <div className={`single__wall-facilities-container ${tabContent === 'facilities' && 'visible'}`}>
                                        <div className={`single__wall-facilities ${tabContent === 'facilities' && 'visible'}`}>
                                            <div>
                                                <ul>
                                                    <li>
                                                        <span><img src='/images/bouldering-icon.png' alt='bouldering-icon'/><h4>Bouldering</h4> </span>
                                                        {wall.top && <span><img src='/images/rope-icon.svg' alt='top roping icon' /><h4>Top Roping</h4></span>}
                                                        {wall.lead && <span><img src='/images/quickdraw.png' alt='lead climbing icon' /><h4>Lead Climbing</h4></span>}
                                                        {wall.auto && <span><img src='/images/auto-belay.png' alt='auto belay icon'/><h4>Auto Belay</h4></span>}
                                                        {wall.gym && <span><img src='/images/training-rings.png' alt='gym icon'/><h4>Training Area</h4></span>}
                                                        <span><img src='/images/tea.png' alt='bouldering-icon'/><h4>Tea and Coffee</h4> </span>
                                                        {wall.cafe && <span><img src='/images/cafe.jpg' alt='cafe icon' /><h4>Onsite Cafe</h4></span>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`single__wall-contact-form ${tabContent === 'contact-form' && 'visible'}`}>
                                        <ContactForm 
                                            user={props.user}
                                            wallId={wall.id}
                                            visible={tabContent === 'contact-form'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='review-form'>
                                <button onClick={toggleVisible} className='toggle-review-form'>
                                    <strong>{!alreadyReviewed() && 'Post New Review'}</strong>
                                </button>
                                <ReviewForm
                                    user={props.user}
                                    wallId={wall.id}
                                    visible={alreadyReviewed() ? false : reviewFormVisible}
                                    editing={false}
                                    addReview={addReview}
                                    review={null}
                                    createEditPost={createEditPost}
                                />
                            </div>
                            {(wall.reviews && wall.reviews.length > 0) ? 
                                <Reviews
                                    wallId={wall.id}
                                    reviews={wall.reviews}
                                    user={props.user}
                                    editReviewFormVisible={editReviewFormVisible}
                                    addReview={addReview}
                                    createEditPost={createEditPost}
                                    editReviewFormVisibleToggle={editReviewFormVisibleToggle}
                                    deleteReview={deleteReview}
                                />    
                                :
                                <div>
                                    <h4>No Reviews yet! Post a review to let others know your thoughts.</h4>
                                </div> 
                            }
                        </div>
                        <div className='single__wall-location'>
                            <div className='single__wall-climber-count'>
                                <GaugeChart id="gauge-chart3" 
                                    nrOfLevels={30} 
                                    colors={["#4a7ce9", "#4a7ce9", "#4a7ce9", "#4a7ce9", "#FF5F6D" ]} 
                                    arcWidth={0.4} 
                                    percent={86/200} 
                                    hideText={true}
                                    animDelay={0}
                                />
                                <h4>Current climber count </h4>
                                <CountUp end={86} duration={5}/> of 200 climbers
                            </div>
                            <div className='single__wall-map-location'>
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
                            </div>
                            <div className='single__wall-address'>
                                <p><strong>Address</strong><br />
                                {wall.addressLine1}<br />{wall.addressLine2 && <>{wall.addressLine2} <br /></>}{wall.addressLine3 && <>{wall.addressLine3} <br /></>}{wall.city}<br />{wall.postcode}</p>
                            </div>
                                {/* <iframe src="https://www.google.com/maps/d/embed?mid=1oXA4fxR0XAKnSFUoax7H7tKBAC4ya220" width="640" height="480"></iframe> */}
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