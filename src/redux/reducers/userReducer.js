const initalState = {
    restaurants: [],
    searchRestaurantsError: null,

}

const userReducer = (state = initalState, action) =>{
    switch (action.type)
     {
        case "SEARCH_RESTAURANT_SUCCESS":
            return({
                ...state,
                restaurants: action.restaurants,
                searchRestaurantsError: action.searchRestaurantsError,
            })
        case "SEARCH_RESTAURANT_ERROR":
            return({
                ...state,
                restaurants: [],
                searchRestaurantsError: null,
            })
        case "GETBOOKED_DATA_SUCCESS":
            return({
                ...state,
                bookedData: action.bookedData,
                getBookedDataError: action.getBookedDataError,

            })
        case "GETBOOKED_DATA_ERROR":
            return({
                ...state,
                bookedData: [],
                getBookedDataError: action.getBookedDataError,
            })
        case "FEEDBACK_SUCCESS":
            return({
                ...state,
                feedbackError: action.feedbackError,
            })
        case "FEEDBACK_ERROR":
            return({
                ...state,
                feedbackError: action.feedbackError,
            })
        case "GETFEEDBACK_DATA_SUCCESS":
            return({
                ...state,
                myfeedback: action.myfeedback,
                getMyFeedbackError: action.getMyFeedbackError,
            })
        case "GETFEEDBACK_DATA_ERROR":
            return({
                ...state,
                myfeedback: [],
                getMyFeedbackError: action.getMyFeedbackError,
            })
        default:
            return state;
    }
}

export default userReducer;