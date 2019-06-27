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
        case "ITEMS_ORDER_SUCCESS":
            return({
                ...state,
                itemsOrderError: null,

            })
        case "ITEMS_ORDER_ERROR":
            return({
                ...state,
                itemsOrderError: action.itemsOrderError,
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
        
        default:
            return state;
    }
}

export default userReducer;