import React from 'react'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const WallCard = ({ wall, singleWall }) => (
    <div className='wall-card'>
        <div className='wallcard-heading'>
            <h5>{wall.name}</h5>
        </div>
        <div className='wallcard-image-container'>
            <img src={wall.imageUrl} className='wall-image' alt="" />
        </div>
        <div className='wallcard-content'>
            <div className='wall-details-1'>
                <p><strong>Location:</strong> {wall.region}</p>
                <><strong>User Rating:</strong><br />
                    {wall.reviews && wall.reviews.length > 0 ?
                        <StarRatings
                            rating={wall.reviews.reduce((prev, cur) => { return prev + cur.rating }, 0) / wall.reviews.length}
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
            <div className='wall-details-2'>

                <p><strong>Weekdays:</strong><br />
                    Open: {wall.weekdayOpening}<br />
                    Close: {wall.weekdayClosing}</p>
                <p><strong>Weekends:</strong><br />
                    Open: {wall.weekendOpening}<br />Close: {wall.weekendClosing}</p>
            </div>
        </div>
        {!singleWall && <div>
            <Link to={"/" + wall.slug} ><button className='wallcard-button' >View Details and Reviews</button></Link>
        </div>}
    </div>
)

export default WallCard
