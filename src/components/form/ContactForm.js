import React, { Component } from 'react'
import API from '../../helpers/API'
import Input from './Input'
import { required, email } from '../../util/validators';
import './ContactForm.scss';

class ContactForm extends Component {

    state = {
        contactForm: {
          title: {
            value: '',
            valid: false,
            touched: false,
            validators: [required]
          },
          email: {
            value: '',
            valid: false,
            touched: false,
            validators: [required, email]
          },
          message: {
            value: '',
            valid: false,
            touched: false,
            validators: [required]
          },
        },
        
      };

    inputChangeHandler = (input, value) => {
        this.setState(prevState => {
          let isValid = true;
          for (const validator of prevState.contactForm[input].validators) {
            isValid = isValid && validator(value);
          }
          const updatedForm = {
            ...prevState.contactForm,
            [input]: {
              ...prevState.contactForm[input],
              valid: isValid,
              value: value
            }
          };
          let formIsValid = true;
          for (const inputName in updatedForm) {
            formIsValid = formIsValid && updatedForm[inputName].valid;
          }
          return {
            contactForm: updatedForm,
            formIsValid: formIsValid
          };
        });
      };
    
      inputBlurHandler = input => {
        this.setState(prevState => {
          return {
            contactForm: {
              ...prevState.contactForm,
              [input]: {
                ...prevState.contactForm[input],
                touched: true
              }
            }
          };
        });
      };


      submitHandler = async (e, token) => {
          e.preventDefault()
          const title = this.state.contactForm.title.value
          const message = this.state.contactForm.message.value
          const email = this.state.contactForm.email.value
          const wallId = this.props.wallId
          const contactFormContent = {title, message, email, wallId} 
          console.log(contactFormContent)
          this.state.contactForm.title.value = ''
          this.state.contactForm.message.value = ''
          this.state.contactForm.email.value = ''
        e.target.email.value = ''
        e.target.message.value = ''
        e.target.title.value = ''
      }
      
      render() {
        const {user} = this.props;
          return process.env.NODE_ENV !== 'development' ? 
          (
            <>
            <div className={`contact__form-container ${this.props.visible && 'visible'}`}>
                <div className='contact__form'>
                  <h4>Coming Soon</h4>
                </div>
            </div>
          </>
          ) 
          
          :
          
          user.isAuth ? 
          (
            <>
                <div className={`contact__form-container ${this.props.visible && 'visible'}`}>
                    <div className='contact__form'>
                        <form
                            // autocomplete="off"
                            onSubmit={e =>this.submitHandler(e, user.token)}
                        >
                             <Input
                                id="email"
                                label="Email"
                                type="text"
                                control="input"
                                placeholder="Your email address"
                                onChange={this.inputChangeHandler}
                                onBlur={this.inputBlurHandler.bind(this, 'email')}
                                required={true}
                                value={this.state.contactForm.email.value}
                                valid={this.state.contactForm['email'].valid}
                                touched={this.state.contactForm['email'].touched}
                            />
                            <Input
                                id="title"
                                label="Subject"
                                type="text"
                                control="input"
                                placeholder="Why are you getting in touch?"
                                onChange={this.inputChangeHandler}
                                onBlur={this.inputBlurHandler.bind(this, 'title')}
                                required={true}
                                value={this.state.contactForm.title.value}
                                valid={this.state.contactForm['title'].valid}
                                touched={this.state.contactForm['title'].touched}
                            />
                            <Input
                                id="message"
                                label="Message"
                                type="text"
                                control="textarea"
                                placeholder="Your message"
                                rows={6}
                                onChange={this.inputChangeHandler}
                                onBlur={this.inputBlurHandler.bind(this, 'message')}
                                value={this.state.contactForm.message.value}
                                valid={this.state.contactForm['message'].valid}
                                touched={this.state.contactForm['message'].touched}
                            />
                            <button onClick={null} className='submit-contact'>Send Message</button>
                        </form>
                    </div>
                </div>
            </>
        ) 
        :
        <>
                <div className={`contact__form-container ${this.props.visible && 'visible'}`}>
                    <div className='contact__form'>
                      <h4>Please login or create an account to send a message</h4>
                    </div>
                </div>
            </>
      }
}

export default ContactForm