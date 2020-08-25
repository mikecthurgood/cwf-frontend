import React, { Component } from 'react'
import Input from './Input'
import { required, length, email } from '../../util/validators';
import './AuthForm.scss';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';



class AuthForm extends Component {

    state = {
        loginForm: {
          email: {
            value: '',
            valid: false,
            touched: false,
            validators: [required, email]
          },
          password: {
            value: '',
            valid: false,
            touched: false,
            validators: [required, length({ min: 5 })]
          },
          passwordConfirmation: {
            value: '',
            valid: false,
            touched: false,
            validators: [required, length({ min: 5 })]
          },
          username: {
            value: '',
            confirmation: '',
            valid: false,
            touched: false,
            validators: [required]
          },
          formIsValid: false
        },
        passwordsMatch: true,
        errorMessage: '',
      };

    inputChangeHandler = (input, value) => {
        this.setState(prevState => {
          let isValid = true;
          for (const validator of prevState.loginForm[input].validators) {
            isValid = isValid && validator(value);
          }
          const updatedForm = {
            ...prevState.loginForm,
            [input]: {
              ...prevState.loginForm[input],
              valid: isValid,
              value: value
            }
          };
          let formIsValid = true;
          for (const inputName in updatedForm) {
            formIsValid = formIsValid && updatedForm[inputName].valid;
          }
          return {
            loginForm: updatedForm,
            formIsValid: formIsValid
          };
        });
      };
    
      inputBlurHandler = input => {
        this.setState(prevState => {
          return {
            loginForm: {
              ...prevState.loginForm,
              [input]: {
                ...prevState.loginForm[input],
                touched: true
              }
            }
          };
        });
      };

      submitHandler = async e => {
        console.log(e)
        e.preventDefault()
        const submitData = !this.props.signup ? 
            {
                email: this.state.loginForm.email.value,
                password: this.state.loginForm.password.value
            }
            :
            {
                username: this.state.loginForm.username.value, 
                email: this.state.loginForm.email.value,
                password: this.state.loginForm.password.value,
                passwordConfirmation: this.state.loginForm.passwordConfirmation.value,
            }
        if (this.props.signUp && submitData.password !== submitData.passwordConfirmation) return this.setState({ passwordsMatch: false, errorMessage: 'Passwords do not match'} )
        const response = await this.props.onSubmit(e, {
            submitData
        })
        if (response && response.error) return this.setState({errorMessage: response.error.message})
      }

      closeMobileMenu = () => {
        this.props.loginToggle()
        this.props.mobileMenuToggle()
      }
      
      render() {
          const { loginError, signup, user, hideRegisterButton } = this.props
          if (user && user.userId) {
            return <Redirect to={"/"} />
          }
          return (
            <>
              <div className='auth__form-container'>
                <div className='auth__form'>
                  <div className='auth__form-components'>
                    {!signup && !hideRegisterButton && <Link to='/signup'><button className='login_logout register'>Register</button></Link>}
                    <form className={`${loginError ? 'error' : ''}`}
                        onSubmit={e =>this.submitHandler(e)}
                    >
                        {signup && <Input
                        id="username"
                        label="username"
                        type="text"
                        control="input"
                        placeholder="Choose a username"
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler.bind(this, 'username')}
                        value={this.state.loginForm.username.value}
                        valid={this.state.loginForm['username'].valid}
                        touched={this.state.loginForm['username'].touched}
                        />}
                        <Input
                        id="email"
                        label={`${signup ? 'Your Email' : ''}`}
                        type="email"
                        control="input"
                        placeholder={`${signup ? 'Enter your email' : 'Email'}`}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler.bind(this, 'email')}
                        value={this.state.loginForm.email.value}
                        valid={this.state.loginForm['email'].valid}
                        touched={signup ? this.state.loginForm['email'].touched : null}
                        />
                        <Input
                        id="password"
                        placeholder={`${signup ? 'Password' : ''}`}
                        label={`${signup ? 'Password' : ''}`}
                        type="password"
                        control="input"
                        placeholder={`${signup ? 'Choose your password' : 'Password'}`}
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler.bind(this, 'password')}
                        value={this.state.loginForm['password'].value}
                        valid={this.state.loginForm['password'].valid}
                        touched={signup ? this.state.loginForm['password'].touched : null}
                        />
                        {signup && <Input
                        id="passwordConfirmation"
                        label="Confirm Password"
                        type="password"
                        control="input"
                        placeholder="Confirm your password"
                        onChange={this.inputChangeHandler}
                        onBlur={this.inputBlurHandler.bind(this, 'passwordConfirmation')}
                        value={this.state.loginForm['passwordConfirmation'].confirmation}
                        valid={this.state.loginForm['passwordConfirmation'].valid}
                        touched={this.state.loginForm['passwordConfirmation'].touched}
                        />}
                        {signup && this.state.errorMessage && (
                          <>
                            <h6>{this.state.errorMessage}</h6>
                          </>
                        )}
                        <div className='submit-button'>
                          <button onClick={this.closeMobileMenu} disabled={(this.state.loginForm['password'].value.length < 1 || this.state.loginForm.email.value.length < 1) ? true : false} className={`login_logout ${(this.state.loginForm['password'].value.length < 1 || this.state.loginForm.email.value.length < 1) ? 'disabled' : 'active'}`}>{signup ? 'Signup' : 'Login'}</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
            </>
        )
      }
}

export default AuthForm