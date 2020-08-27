import React from 'react'
import StarRatings from 'react-star-ratings';
import ReviewForm from '../../components/form/reviewForm'

const Reviews = ({reviews, wallId, user, editReviewFormVisible, addReview, createEditPost, editReviewFormVisibleToggle, deleteReview}) => (
    <div className='single__wall-customer-reviews'>
        {reviews.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : 1).map(review => (
            <div className='review__card' key={review.id}>
                <div className='review__card-heading'>
                    <div className='review__card-title'><h3>{review.title}</h3></div>
                    <div className='review__card-rating'>
                    <StarRatings
                        rating={Number(review.rating)}
                        starRatedColor="gold"
                        numberOfStars={5}
                        name='rating'
                        starDimension="20px"
                        starSpacing="0px"
                        />
                    </div>
                </div>
                {review.content && <div className='review__card-content'>{review.content}</div>}
                <div className='review__card-author'><h5>{review.authorName}</h5></div>
                {(review.authorId === user.userId) && <button onClick={() => editReviewFormVisibleToggle(review.id)} className='toggle-review-form'>{editReviewFormVisible === review.id ? 'Cancel' : 'Edit Review'}</button>}
                {(review.authorId === user.userId) && <a href='#editReview'><button onClick={() => deleteReview(review.id)} className='delete-review'>Delete</button></a>}
                <div className='edit-review' id='editReview'>
                <ReviewForm 
                    user={user}
                    wallId={wallId}
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
)

export default Reviews
