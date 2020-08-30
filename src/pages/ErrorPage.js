import React from 'react'
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'
import './errorPage.scss'

const SingleWall = (props) => (
    <>
        <Helmet>  {/* page title */}
            <title> 404 | Page Not Found | Clambr </title>
        </Helmet>
        <div className='error-page-container'>
        
            <div className='error-page'>
                {/* <span> */}
                    <h1>Page not found</h1>
                    <p>We're sorry, this page doesn't seem to exist on the Clambr site.</p>
                    <Link to='/'><p className='back-button'>Back to wall list</p></Link>
                {/* </span> */}
            </div>
        </div>
    </>   
)

export default SingleWall