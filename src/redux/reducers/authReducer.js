const defaultState = {
    user: {},
    userData: {},
    isError: null,
    deleteBookingError: null,
}

const authReducer = (state = defaultState, action)=>{
    switch (action.type) 
    {
        case "SIGNUP_SUCCESS":
            return({
                ...state,
                user: action.user, 
                userData: action.userData,
                isError: false,
                signUpError: null,
            })
        case "SIGNUP_ERROR":
            return({
                ...state,
                user: null,
                isError: true,
                userData: null,
                signUpError: action.signUpError
            })
        case "SIGNIN_SUCCESS":
            return({
                ...state,
                signInError: null,
                user: action.user, 
                userData: action.userData,
            })
        case "SIGNIN_ERROR":
            return({
                ...state,
                user: null,
                userData: null,
                isError: true,
                signInError: action.signInError
            })
        case "SIGNOUT_SUCCESS":
            return({
                state: defaultState,
            })
        case "SIGNOUT_ERROR":
            return({
                ...state,
                signOutError: action.signOutError,
            })
        default:
            return state
    }
}

export default authReducer;