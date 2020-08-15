const get = (graphqlQuery) => (
    fetch('http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(graphqlQuery),
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept'      : `application/json`
        }
    })
)

const post = (graphqlQuery, token) =>(
    fetch('http://localhost:8080/graphql', {
        method: 'POST',
        body: JSON.stringify(graphqlQuery),
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Accept'      : `application/json`
        }
    })
    )

const getWalls = async () => {
    const graphqlQuery = { query: `
        {
            walls {
                walls {
                    id
                    name
                    description
                    weekdayOpening
                    weekdayClosing
                    weekendOpening
                    weekendClosing
                    openingNotes
                    websiteUrl
                    imageUrl
                    boulderingOnly
                    addressLine1
                    addressLine2
                    addressLine3
                    city
                    region
                    postcode
                    slug
                    reviews {
                        rating
                      }
                }
                loggedIn
            }
        }
    `}
    const walls = await get(graphqlQuery)
    return walls
}
// const getUser = (id) => get(userUrl + id)
// const signIn = (username, password) => post(signInUrl, { username, password })
// const validate = () => get(validateUrl)
// const createUser = (user) => post(userUrl, user)
const getWall = async (wallId) => {
    const graphqlQuery = {
        query: `
            query GetSingleWall($wallId: String!) {
                singleWall(wallId: $wallId) {
                    wall {   
                        id
                        name
                        description
                        weekdayOpening
                        weekdayClosing
                        weekendOpening
                        weekendClosing
                        openingNotes
                        websiteUrl
                        imageUrl
                        boulderingOnly
                        addressLine1
                        addressLine2
                        addressLine3
                        city
                        region
                        postcode
                        reviews {
                            id
                            title
                            rating
                            content
                            authorName
                            createdAt
                            authorId
                          }
                    }
                    loggedIn
                }
            }
        `,
        variables: {
            wallId: wallId
          }
    }
    const wall = await get(graphqlQuery)
    return wall
}

const createEditReview = async (reviewData, editing, token) => {
    let queryType
    let queryTypeString
    console.log(reviewData)
    if (editing) {
        queryType = `updateReview`
        queryTypeString = `${queryType}(id: "${reviewData.reviewId}", userInput: {`
    } else {
        queryType = `createReview`
        queryTypeString = `${queryType}(userInput: {`
    }
        let graphqlQuery = {
        query: `
            mutation reviewQuery($reviewTitle: String!, $reviewContent: String!, $reviewRating: Int!, $wallId: String! ){
                ${queryTypeString}
                    title: $reviewTitle,
                    content: $reviewContent,
                    rating: $reviewRating
                    wallId: $wallId
                }) {
                    id
                    title
                    content
                    authorName
                    authorId
                    wallId
                    createdAt
                    rating
                }
            }
        `,
        variables: {
            reviewTitle: reviewData.title,
            reviewContent: reviewData.content,
            reviewRating: reviewData.rating,
            wallId: reviewData.wallId,
        }
    }
    return await post(graphqlQuery, token)
      .then(res => {
        return res.json();
      })
      .then(resData => {
        if (resData.errors && resData.errors[0].status === 422) {
          throw new Error('Validation failed.');
        }
        if (resData.errors) {
          const error =  new Error('Could not authenticate you!')
          console.log(resData.errors)
          throw error
          ;
        }
        let {id, title, content, authorName, authorId, wallId, createdAt, rating } = resData.data[queryType]
        const review = {
          id: id,
          title,
          content,
          authorName,
          authorId,
          createdAt: Number(createdAt),
          wallId,
          rating
        };
        return review
        })
      .catch(err => {
        console.log(err);
        // this.setState({
        //   isEditing: false,
        //   editPost: null,
        //   editLoading: false,
        //   error: err
        // });
      });
    }

// const getReview = (reviewId) => get(reviewsUrl + reviewId)
    const deleteReview = async (reviewId, token) => {
        let graphqlQuery = {
            query: `
            mutation DeleteReview($id: ID!){
              deleteReview(id: $id) 
            }
            `,
            variables: {
              id: reviewId
            }
          }
       
        try {
            const result = await post(graphqlQuery, token).then(res => res.json())
            if (!result.data.deleteReview) {
                throw new Error('Failed to delete review!');
            }
            return result.data.deleteReview
            }
            catch(err) {
                console.log(err);
            };
         };

export default {
    createEditReview,
    deleteReview,
    // getReviews,
    getWalls,
    // getUser,
    // signIn,
    // validate,
    // createUser,
    getWall,
    // getReview,
}
