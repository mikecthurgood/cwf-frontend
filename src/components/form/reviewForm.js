import React, { Component } from 'react'
import API from '../../helpers/API'
import Input from './Input'
import { required, length } from '../../util/validators';
import './ReviewForm.scss';
import StarRatings from 'react-star-ratings';



class ReviewForm extends Component {

    state = {
        reviewForm: {
          title: {
            value: this.props.review? this.props.review.title : '',
            valid: false,
            touched: false,
            validators: [required, length({ min: 5 })]
          },
          content: {
            value: this.props.review? this.props.review.content : '',
            valid: false,
            touched: false,
            validators: []
          },
          rating: this.props.review? this.props.review.rating : 0,
        },
        
      };

    inputChangeHandler = (input, value) => {
        this.setState(prevState => {
          let isValid = true;
          for (const validator of prevState.reviewForm[input].validators) {
            isValid = isValid && validator(value);
          }
          const updatedForm = {
            ...prevState.reviewForm,
            [input]: {
              ...prevState.reviewForm[input],
              valid: isValid,
              value: value
            }
          };
          let formIsValid = true;
          for (const inputName in updatedForm) {
            formIsValid = formIsValid && updatedForm[inputName].valid;
          }
          return {
            reviewForm: updatedForm,
            formIsValid: formIsValid
          };
        });
      };
    
      inputBlurHandler = input => {
        this.setState(prevState => {
          return {
            reviewForm: {
              ...prevState.reviewForm,
              [input]: {
                ...prevState.reviewForm[input],
                touched: true
              }
            }
          };
        });
      };

      changeRating = ( newRating, name ) => {
            this.setState(prevState => {
                return{
                    reviewForm: {
                      ...prevState.reviewForm,
                      rating: newRating,
                }
          }
        });
      }

      submitHandler = async (e, editing, token) => {
          e.preventDefault()
          const reviewId = this.props.review ? this.props.review.id : null
          const title = this.state.reviewForm.title.value
          const content = this.state.reviewForm.content.value
          const rating = this.state.reviewForm.rating
          const wallId = this.props.wallId
          const reviewData = editing ? {reviewId, title, content, rating, wallId} : {title, content, rating, wallId} 
          this.props.createEditPost(reviewData, editing, token)
      }
      
      render() {
        const {visible, editing, user} = this.props;
          return user.isAuth ? 
          (
            <>
                <hr />
                <div className={`review__form-container ${visible? 'visible' : ''}`}>
                    <div className='review__form'>
                        <form
                            // autocomplete="off"
                            onSubmit={e =>this.submitHandler(e, editing, user.token)}
                        >
                            <Input
                                id="title"
                                label="Title"
                                type="text"
                                control="input"
                                placeholder="Title of your review"
                                onChange={this.inputChangeHandler}
                                onBlur={this.inputBlurHandler.bind(this, 'title')}
                                required={true}
                                value={this.state.reviewForm.title.value}
                                valid={this.state.reviewForm['title'].valid}
                                touched={this.state.reviewForm['title'].touched}
                            />
                            <Input
                                id="content"
                                label="Review content (optional)"
                                type="text"
                                control="textarea"
                                placeholder="How was your experience at this wall?"
                                rows={6}
                                onChange={this.inputChangeHandler}
                                onBlur={this.inputBlurHandler.bind(this, 'content')}
                                value={this.state.reviewForm.content.value}
                                valid={this.state.reviewForm['content'].valid}
                                // touched={this.state.reviewForm['content'].touched}
                            />
                            <label>Your rating</label>
                            <StarRatings
                                rating={this.state.reviewForm.rating}
                                required={true}
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                                starRatedColor="gold"

                            />
                            <br />
                            <button onClick={null} className='submit-review'>Submit</button>
                        </form>
                    </div>
                </div>
                <hr />
            </>
        ) 
        :
        <>
                <hr />
                <div className={`review__form-container ${visible? 'visible' : ''}`}>
                    <div className='review__form'>
                      <h4>Please login or create an account to post a review</h4>
                    </div>
                </div>
                <hr />
            </>
      }
}

export default ReviewForm