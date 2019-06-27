import firebase from '../../config/firebase';


export const searchRestaurantByText = (searchText) =>{
    let restaurants = [];
    return(dispatch) =>{
        firebase.firestore().collection("items").orderBy("rating", 'desc')
        .onSnapshot(snapShot =>{
            restaurants = [];
            snapShot.forEach(doc =>{

                if((doc.data().name).toLowerCase().indexOf(searchText) != -1)
                {
                    console.log(doc.data())
                    restaurants.push(doc.data());
                }
            })
            dispatch({type: "SEARCH_RESTAURANT_SUCCESS", restaurants })
        }, (error) =>{
            dispatch({type: "SEARCH_RESTAURANT_ERROR", searchRestaurantsError: error.message })
        })
    }
}

export const deleteBooking = (id) =>{
    return(dispatch) =>{
        firebase.firestore().collection('bookings').doc(id)
        .delete()
        .then(()=>{
            dispatch({ type: "DELETE_BOOKING_SUCCESS", deleteBookingError: null})
        })
        .catch((error) =>{
            dispatch({ type: "DELETE_BOOKING_ERROR", deleteBookingError: error})
        })
    }
}

export const setFeedback = ( feedbackData ) =>{
    return(dispatch) =>{
        firebase.firestore().collection('feedbacks')
        .add({
            message: feedbackData.message,
            username: feedbackData.username,
            date: feedbackData.date,
            userId: feedbackData.userId,
        })
        .then(()=>{
            alert("Successfully submitted");
            dispatch({type: "FEEDBACK_SUCCESS", feedbackError: null})
        })
        .catch((error) =>{
            dispatch({type: "FEEDBACK_ERROR", feedbackError: error})
        })
    }
}

export const myFeedback = (userId) =>{
    return(dispatch) =>{
        let myfeedback = [];
        firebase.firestore().collection('feedbacks')
        .where("userId", "==", userId)
        .onSnapshot(snapShot =>{
            myfeedback = [];
            snapShot.forEach(doc =>{
                myfeedback.push({ ...doc.data(), id: doc.id});
            })
            dispatch({type: "GETFEEDBACK_DATA_SUCCESS", myfeedback, getMyFeedbackError: null})
        }, (error) =>{
            dispatch({type: "GETFEEDBACK_DATA_ERROR", getMyFeedbackError: error })
        })

    }
}

