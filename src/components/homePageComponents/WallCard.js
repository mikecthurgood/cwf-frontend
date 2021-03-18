import React from 'react'
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';
import './WallCard.scss'

const WallCard = ({ wall, setScrollPosition }) => (
    <Link to={"/walls/" + wall.slug} className='wall-card' onClick={() => setScrollPosition(document.getElementsByClassName('app-container')[0].scrollTop)} >
        <div className='wallcard-heading'>
            <h5>{wall.name}</h5>
            {wall.distance && <h4>({wall.distance} miles)</h4>}
        </div>
        <div className='wallcard-image-container'>
            <picture className='wall-image'>
                <source srcSet={wall.imageUrl} type='image/webp'></source>
                <source srcSet={wall.imageUrl.replace('webp', 'jpg').replace('/climbing-walls', '/climbing-walls/jpegs')} type='image/jpeg'></source>
                <img src={wall.imageUrl.replace('webp', 'jpg').replace('/climbing-walls', '/climbing-walls/jpegs')} className='wall-image' alt="" />
            </picture>
        </div>
        <div className='wallcard-content'>
            <div className='wall-details-1'>
                <p><strong>Location:</strong> {wall.region}</p>
                <><strong>User Rating:</strong><br />
                    {wall.reviews && wall.reviews.length > 0 ?
                        <StarRatings
                            rating={wall.reviews.reduce((prev, cur) => { return prev + cur.rating }, 0) / wall.reviews.length}
                            starRatedColor="gold"
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
        <div>
            <button className='wallcard-button' >View Details and Reviews</button>
        </div>
    </Link>
)

export default WallCard
