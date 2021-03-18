import React from 'react'
import './signUpsuccess.scss'

const SignUpSuccessModal = ({ clearSignUpSuccess }) => (
    <div className='signup__success-modal-container'>
        <div className='signup__success-modal'>
            <h3>Signup Successful</h3>
            <p>Please login to access all features</p>
            <span>
                <button onClick={clearSignUpSuccess}>Ok</button>
            </span>
            
        </div>
    </div>
)

export default SignUpSuccessModal
