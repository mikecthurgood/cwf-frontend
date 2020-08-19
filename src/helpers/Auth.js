export const handleLogin = (authData) => {
    const promise = new Promise((resolve, reject) => {
        // reader.onload = e => resolve(e.target.result);
        // reader.onerror = err => reject(err);
        const { email, password } = authData.submitData
        const graphqlQuery = {
          query: `
            query LoginUser($email: String!, $password: String!){
              login(
                email: $email,
                password: $password
              ) {
                token
                userId
                username
              }
            }
          `,
          variables: {
            email: email,
            password: password
          }
        }
        fetch('https://clambr-api.herokuapp.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(graphqlQuery)
        })
          .then(res => {
            return res.json();
          })
          .then(resData => {
              console.log(resData)
            if (resData.errors && resData.errors[0].status === 422) {
              throw new Error('Validation failed.');
            }
            if (resData.errors) {
              throw new Error('Could not authenticate you!');
            }
        
            localStorage.setItem('token', resData.data.login.token);
            localStorage.setItem('userId', resData.data.login.userId);
            localStorage.setItem('userName', resData.data.login.username);
    
            resolve ({
              isAuth: true,
              token: resData.data.login.token,
              userId: resData.data.login.userId,
              username: resData.data.login.username
            });
    
          })
          .catch(err => {
            console.log(err);
            resolve ({
              isAuth: false,
              authLoading: false,
              error: err
            });
          });
        });
        return promise
      }

 export const handleSignup = async (authData) => {
    const promise = new Promise( async (resolve, reject) => {
    const { username, email, password, passwordConfirmation } = authData.submitData
    try{
        if (password !== passwordConfirmation) {
            const error = new Error();
            error.name = "Passwords do not match"
            error.type = "passwordMatch"
            throw error
        }
        const graphqlQuery = {
        query: `
            mutation UserSignUp($email: String!, $name: String!, $password: String!) {
            createUser(userInput: {
                email: $email,
                name: $name,
                password: $password
            }) {
                id
                email
                name
            }
            }
        `,
        variables: {
            email: email,
            name: username,
            password: password
        }
        }
        const resData = await fetch('https://clambr-api.herokuapp.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(graphqlQuery)
        }).then(res => {return res.json()})
        if (resData.errors && resData.errors[0].status === 422) {
        throw new Error(
            "Validation failed. Make sure the email address isn't used yet!"
        );
        }
        if (resData.errors && resData.errors[0].status === 456) {
            throw new Error(
                "Invalid email address"
            );
            }
        if (resData.errors) {
        throw new Error('User creation failed!');
        }
        resolve({ isAuth: false, authLoading: false, signupSuccess: true, userID: resData.data.createUser.id, username: resData.data.createUser.name });
    }
      catch(err) {
        console.log(err);
        resolve({
          isAuth: false,
          authLoading: false,
          error: err,
          signupSuccess: false
        })
      };
  })
  return promise
}