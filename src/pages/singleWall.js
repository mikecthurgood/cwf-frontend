import React, { useState, useEffect } from 'react'
import API from '../helpers/API'
import StarRatings from 'react-star-ratings';
import ReviewForm from '../components/form/reviewForm'
import './singlewall.scss'
import MapComponent from '../components/map'

import { Helmet } from 'react-helmet'

const SingleWall = (props) => {
    
    const [wall, setWall] = useState({})
    const [reviewFormVisible, setReviewFormVisibility] = useState(false)
    const [editReviewFormVisible, setEditReviewFormVisibility] = useState(null)
    let wallDescription
    
    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchWall = async () => {
            const response = await API.getWall(props.match.params.wallSlug).then(resp => resp.json())
            console.log(response)
            const data = response.data.singleWall
            if (props.user.userId !== null && !data.loggedIn) props.signOut()
            console.log(data)
            if (data.wall !== wall) {
                setWall(data.wall);
            }
        }
    try{
        fetchWall();
    } catch (err) {
        console.log(err)
    }

    }, [props.match.params.wallId, props]);

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
        const result = await API.deleteReview(reviewId, props.user.token)
        if (result) {
            const updatedWall = {...wall, reviews: wall.reviews.filter(review => review.id !== reviewId)}
            setWall(updatedWall)
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
        console.log(wall.description)
       const desc = wall.description.split("`")
       console.log(desc.length)
       if (desc.length > 1) return desc[1]
       return {__html: `<div>${wall.description}</div>`}
    }

    return (
        <>
        {wall.name && (
            <>
            <Helmet>
            <title>{wall.name} | {wall.region} | Clambr </title>
          </Helmet>
        <div className='single__wall'>
            <div className='single__wall-image-container' styles={{backgroundImage: `url(${wall.imageUrl})`}} >
                <img src={wall.imageUrl} className='wall-image' alt="" />
            </div>
            <div className='single__wall-main-container'>
                <div className='single__wall-content'>
                    <div className='single__wall-main-content-container'>
                        <div className='single__wall-heading'>
                            <div className="single__wall-title">
                                <h1>
                                    {wall.name}
                                </h1>
                            </div>
                            <div className="single__wall-region">
                                <h4>
                                    {wall.region}
                                </h4>
                            </div>
                        </div>
                        <div className='single__wall-description'>
                            <div className='single__wall-description-content' dangerouslySetInnerHTML={createHTMLdescription()}>
                            </div>
                        </div>
                        <div className='review-form'>
                        <button onClick={toggleVisible} className='toggle-review-form'><strong>Post New Review</strong></button>
                            <ReviewForm 
                                user={props.user}
                                wallId={wall.id}
                                visible={reviewFormVisible}
                                editing={false}
                                addReview={addReview}
                                review={null}
                                createEditPost={createEditPost}
                            />
                        </div>
                        {(wall.reviews && wall.reviews.length > 0) ? <div className='single__wall-customer-reviews'>
                            {wall.reviews.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1).map(review => (
                                <div className='review__card' key={review.id}>
                                    <div className='review__card-heading'>
                                        <div className='review__card-title'><h3>{review.title}</h3></div>
                                        <div className='review__card-rating'>
                                        <StarRatings
                                            rating={Number(review.rating)}
                                            starRatedColor="gold"
                                            // changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                            starDimension="20px"
                                            starSpacing="0px"
                                            />
                                        </div>
                                    </div>
                                    {review.content && <div className='review__card-content'>{review.content}</div>}
                                    <div className='review__card-author'><h5>{review.authorName}</h5></div>
                                    {(review.authorId === props.user.userId) && <button onClick={() => editReviewFormVisibleToggle(review.id)} className='toggle-review-form'>{editReviewFormVisible === review.id ? 'Cancel' : 'Edit Review'}</button>}
                                    {(review.authorId === props.user.userId) && <button onClick={() => deleteReview(review.id)} className='toggle-review-form'>Delete</button>}
                                    <div className='edit-review'>
                                    <ReviewForm 
                                        user={props.user}
                                        wallId={wall.id}
                                        visible={editReviewFormVisible === review.id}
                                        editing={true}
                                        addReview={addReview}
                                        review={review}
                                        createEditPost={createEditPost}
                                    />
                                    </div>
                                </div>
                            ))}

                        </div>
                        :
                        <div>
                            <h4>No Reviews yet! Post a review to let others know your thoughts.</h4>
                        </div> }
                    </div>
                    <div className='wall-details'>
                        <div className='wall-details-1'>
                            <><strong>User Rating: </strong>
                                {wall.reviews && wall.reviews.length > 0 ?
                                    <StarRatings
                                        rating={wall.reviews.reduce((prev, cur) => { return prev + Number(cur.rating) }, 0) / wall.reviews.length}
                                        starRatedColor="gold"
                                        // changeRating={this.changeRating}
                                        numberOfStars={5}
                                        name='rating'
                                        starDimension="20px"
                                        starSpacing="0px"
                                    />
                                    :
                                    'No ratings yet'}</>
                            <strong>{wall.boulderingOnly && <p style={{ color: 'red' }}>Bouldering Only</p>}</strong>
                        </div>
                        <div className='wall-opening-hours'>

                            <p><strong>Weekdays:</strong><br />
                                Open: {wall.weekdayOpening} Close: {wall.weekdayClosing}</p>
                            <p><strong>Weekends:</strong><br />
                                Open: {wall.weekendOpening} Close: {wall.weekendClosing}</p>
                                <p>{wall.openingNotes}</p>
                            
                        </div>
                        <div className='single__wall-map-location'>
                                <MapComponent 
                                    isMarkerShown
                                    googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCZu0xiV2v0ztRCKqfEQA3ID6MrWKOQbbQ&libraries=geometry,drawing,places'
                                    loadingElement={<div style={{ height: `100%` }} />}
                                    containerElement={<div style={{ height: `300px` }} />}
                                    mapElement={<div style={{ height: `100%` }} />}
                                    address={props.addressLine1}
                                    postcode={wall.postcode}
                                />
                            </div>
                        <div className='wall-address'>
                            <p><strong>Address</strong><br />
                            {wall.addressLine1}, {wall.addressLine2 && wall.addressLine2}, {wall.addressLine3 && wall.addressLine3 + ','}{wall.city}, {wall.postcode}</p>
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