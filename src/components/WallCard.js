import React from 'react'

const WallCard = ({ wall }) => (
    <div className='wall-card'>
        <div className='wallcard-heading'>
            <h5>{wall.name}</h5>
        </div>
        <div className='wallcard-image-container'>
            <img src={wall.image_url} className='wall-image' alt="" />
        </div>
    </div>
)

export default WallCard
