import React, {useState, useEffect, useContext} from 'react'
import Input from './Input'
import { required, length, email } from '../../util/validators';
import './AuthForm.scss';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Store from '../../context/Store';



const AuthForm = ({ loginToggle, loginError, signup, hideRegisterButton }) => {

  const { user, signupHandler, loginHandler } = useContext(Store)

  useEffect(() => {
    if (user && user.userId) {
      return <Redirect to={"/"} />
    }
  }, []);

  const [ userEmail, setUserEmail ] = useState({
    value: '',
    valid: false,
    touched: false,
  })

  const [password, setPassword ] = useState({
    value: '',
    valid: false,
    touched: false,
  })

  const [passwordConfirmation, setPasswordConfirmation ] = useState({
    value: '',
    valid: false,
    touched: false,
  })

  const [username, setUsername] = useState({
    value: '',
    confirmation: '',
    valid: false,
    touched: false,
  })

  const validators = {
    userEmail: [required, email],
    password: [required, length({ min: 5 })],
    passwordConfirmation: [required, length({ min: 5 })],
    username: [required]
  }

  const [errorMessages, setErrorMessages] = useState([])

  function inputChangeHandler (input, value) {

    let isValid = true;
    
    for (const validator of validators[input]) {
      isValid = isValid && validator(value);
    }

    switch (input) {
      case 'username': setUsername({...username, value, valid: isValid})
      break;
      case 'userEmail': setUserEmail({...userEmail, value, valid: isValid})
      break;
      case 'password': setPassword({...password, value, valid: isValid})
      break;
      case 'passwordConfirmation': setPasswordConfirmation({...passwordConfirmation, value, valid: isValid})
      break;
    }
  };

  function inputBlurHandler (e) {
    const {value, id} = e.target
    let isValid = true;
    for (const validator of validators[id]) {
      isValid = isValid && validator(value);
    }

    switch (id) {
      case 'username': setUsername({...username, valid: isValid, touched: true })
      break;
      case 'userEmail': setUserEmail({...userEmail, valid: isValid, touched: true})
      break;
      case 'password': setPassword({...password, valid: isValid, touched: true})
      break;
      case 'passwordConfirmation': setPasswordConfirmation({...passwordConfirmation, valid: isValid, touched: true})
      break;
    }
  };

  async function submitHandler (e) {
    e.preventDefault()
    const submitData = signup ? 
        {
          username: username.value, 
          email: userEmail.value,
          password: password.value,
          passwordConfirmation: passwordConfirmation.value,
        }
        :
        {
          email: userEmail.value,
          password: password.value
        }

    const response = signup ? await signupHandler(e, { submitData }) : await loginHandler(e, { submitData })
    if (response && response.error) {
      return setErrorMessages(response.error)
    }
  }

  function closeMobileMenu () {
    loginToggle()
  }
  
  const disabled = password.value.length < 3 || userEmail.value.length < 3 ? true : false
      
  return (
    <>
      <div className='auth__form-container'>
        <div className='auth__form'>
          <div className='auth__form-components'>
            {!signup && !hideRegisterButton && <Link to='/signup'><button className='login_logout register'>Register</button></Link>}
            <form className={`${loginError ? 'error' : ''}`}
                onSubmit={e => submitHandler(e)}
            >
                {signup && <Input
                id="username"
                label="username"
                type="text"
                control="input"
                placeholder="Choose a username"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={username.value}
                valid={username.valid}
                touched={username.touched}
                />}
                <Input
                id="userEmail"
                label={`${signup ? 'Your Email' : ''}`}
                type="email"
                control="input"
                placeholder={`${signup ? 'Enter your email' : 'Email'}`}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={userEmail.value}
                valid={userEmail.valid}
                touched={signup ? userEmail.touched : null}
                />
                <Input
                id="password"
                label={`${signup ? 'Password' : ''}`}
                type="password"
                control="input"
                placeholder={`${signup ? 'Choose your password' : 'Password'}`}
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={password.value}
                valid={password.valid}
                touched={signup ? password.touched : null}
                />
                {signup && <Input
                id="passwordConfirmation"
                label="Confirm Password"
                type="password"
                control="input"
                placeholder="Confirm your password"
                onChange={inputChangeHandler}
                onBlur={inputBlurHandler}
                value={passwordConfirmation.confirmation}
                valid={passwordConfirmation.valid}
                touched={passwordConfirmation.touched}
                />}
                {signup && errorMessages.length > 0 ? (
                  <><div className='signup-errors'>
                  <h6>THERE WERE SOME ERRORS</h6>
                    {errorMessages.map(error => {
                      return (
                          <h6 key={error.message}>- {error.message}</h6>
                      )
                    })}
                    </div>
                  </>)
                  :
                  <>
                  </>
                }
                <div className='submit-button'>
                  <button onClick={closeMobileMenu} disabled={disabled} className={`login_logout ${disabled ? 'disabled' : 'active'}`}>{signup ? 'Signup' : 'Login'}</button>
                </div>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default AuthForm