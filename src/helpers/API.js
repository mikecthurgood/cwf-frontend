const baseUrl = 'http://localhost:3000/'
const wallsUrl = baseUrl + 'walls/'
const reviewsUrl = baseUrl + 'reviews/'
const userUrl = baseUrl + 'users/'
// const citiesUrl = baseUrl + 'cities/'
const signInUrl = baseUrl + 'signin'
const validateUrl = baseUrl + 'validate'

const getReviews = () => get(reviewsUrl)
const getWalls = () => get(wallsUrl)
const getUser = (id) => get(userUrl + id)
const signIn = (username, password) => post(signInUrl, { username, password })
const validate = () => get(validateUrl)
const createUser = (user) => post(userUrl, user)
const getWall = (wallId) => get(wallsUrl + wallId)
const getReview = (reviewId) => get(reviewsUrl + reviewId)

const get = (url) =>
    fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }).then(resp => resp.json())

const post = (url, data) =>
    fetch(url, {
        method: 'POST',
        headers: {
            Authorization: localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(resp => resp.json())

export default {
    getReviews,
    getWalls,
    getUser,
    signIn,
    validate,
    createUser,
    getWall,
    getReview,
}