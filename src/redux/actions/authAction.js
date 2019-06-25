import firebase from '../../config/firebase';

export const restaurantRegistration = (userData) =>{
    return(dispatch) =>{
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then((response) =>{
            let imgRef = firebase.storage().ref().child(`certificates/${Math.random().toString().substring(3, 10)}`);
                imgRef.put(userData.certificate)
                .then(()=>{
                    imgRef.getDownloadURL()
                    .then(imgURL=>{
                        firebase.firestore().collection('users').add({
                            fullName: userData.fullName,
                            email: userData.email,
                            restaurantName: userData.restaurantName,
                            country: userData.country,
                            city: userData.city,
                            uid: response.user.uid,
                            userType: "restaurant",
                            certificateURL: imgURL,
                        })
                        .then((resp) =>{
                            console.log("Response", resp.data());
                            dispatch({type: "SIGNUP_SUCCESS", user: response.user, name: userData.name, userType: "user"})
                        })
                        .catch((error) =>{
                            dispatch({ type: "SIGNUP_ERROR", signUpError: error.message})
                        })
                    })
                })
        })        
        .catch(error =>{
            dispatch({ type: "SIGNUP_ERROR", signUpError: error.message})
        })
    }
}

export const userRegistration = (userData) =>{
    return(dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
        .then((response) =>{
            firebase.firestore().collection('users')
            .doc(response.user.uid)
            .set({
                fullName: userData.fullName,
                email: userData.email,
                gender: userData.gender,
                age: userData.age,
                country: userData.country,
                city: userData.city,
                uid: response.user.uid,
                userType: "user",
            })
            .then((resp) =>{
                console.log("Response", resp);
                dispatch({
                    type: "SIGNUP_SUCCESS", 
                    user: response.user, 
                    userData:{ 
                        ...userData, 
                        uid: response.user.uid, 
                        userType: "user"
                    }
                })
            })
        })
        .catch((error) =>{
            dispatch({ type: "SIGNUP_ERROR", signUpError: error.message})
        })
    }
}

export const signIn = (userData) =>{
    return(dispatch) => {
        firebase.auth().signInWithEmailAndPassword(userData.email, userData.password)
        .then((response) =>{
            firebase.firestore().collection('users')
            .doc(response.user.uid)
            .onSnapshot((doc) =>{
                console.log("response.user", response.user);
                dispatch({type: "SIGNIN_SUCCESS", user: response.user, userData: doc.data() })
            },
            (error) =>{
                dispatch({ type: "SIGNIN_ERROR", signInError: error.message})
            })
        })
        .catch(error =>{
            dispatch({ type: "SIGNIN_ERROR", signInError: error.message})
        })
    }
}   

export const signOut = () =>{
    return(dispatch)=>{
        firebase.auth().signOut()
        .then(() =>{
            dispatch({type: "SIGNOUT_SUCCESS"})
        })
        .catch((error) =>{
            dispatch({ type: "SIGNOUT_ERROR", signOutError: error})
        })
    }
}

// export const getRestorent = (searchText) =>{
//     return(dispatch) =>{
//         firebase.firestore().collection('restorem').where('menu', "==", searchText)
//         .get()
//         .then(snapShot =>{
//             let restaurants = []
//             snapShot.forEach(doc => {
//                 restaurants.push(doc.data())
//             });
//             dispatch({type: "GET_RESTAURANT_SUCCESS", restaurants})
//         })
//         .catch(error =>{
//             dispatch({type: "GET_RESTAURANT_ERROR", restaurants: [], errorMessage: error.message})
//         })
//     }
// }