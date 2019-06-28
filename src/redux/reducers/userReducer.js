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
        case "GET_ALL_ORDERS_SUCCESS":
            return({
                ...state,
                allOrders: action.allOrders,
                getallOrdersError: action.getallOrdersError,
            })
        case "GET_ALL_ORDERS_ERROR":
            return({
                ...state,
                allOrders: [],
                getallOrdersError: action.getallOrdersError,
            })
        
        default:
            return state;
    }
}

export default userReducer;