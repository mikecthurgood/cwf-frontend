import React from 'react'

const WallCard = ({ wall }) => (
    <div className='wall-card'>
        <div className='wallcard-heading'>
            <h5>{wall.name}</h5>
        </div>
        <div className='wallcard-image-container'>
            <img src={wall.image_url} className='wall-image' alt="" />
        </div>
        <div className='wallcard-content'>
            <div className='wall-details-1'>
                <p><strong>Location:</strong> {wall.area}</p>
                <p><strong>User Rating:</strong><br />
                    {wall.reviews.length > 0 ?
                        `${wall.reviews.reduce((prev, cur) => { return prev + cur.rating }, 0) / wall.reviews.length}/5`
                        :
                        'No ratings yet'}</p>
                <strong>{wall.bouldering_only && <p style={{ color: 'red' }}>Bouldering Only</p>}</strong>
            </div>
            <div className='wall-details-2'>

                <p><strong>Weekdays:</strong><br />
                    Open: {wall.weekday_opening}<br />
                    Close: {wall.weekday_closing}</p>
                <p><strong>Weekends:</strong><br />
                    Open: {wall.weekend_opening}<br />Close: {wall.weekend_closing}</p>
            </div>
        </div>
        <div>
            <button className='wallcard-button'>View Details and Reviews</button>
        </div>
    </div>
)

export default WallCard
