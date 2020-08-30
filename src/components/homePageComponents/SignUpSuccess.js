import React from 'react'
import './signUpsuccess.scss'

const SignUpSuccessModal = ({ setSignUpSuccess }) => (
    <div className='signup__success-modal-container'>
        <div className='signup__success-modal'>
            <h3>Signup Successful</h3>
            <p>Please login to access all features</p>
            <span>
                <button onClick={() => setSignUpSuccess(false)}>Ok</button>
            </span>
            
        </div>
    </div>
)

export default SignUpSuccessModal
