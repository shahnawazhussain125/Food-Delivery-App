import firebase from '../../config/firebase';


export const searchRestaurantByText = (searchText) =>{
    let restaurants = [];
    return(dispatch) =>{
        firebase.firestore().collection("items").orderBy("rating", 'desc')
        .onSnapshot(snapShot =>{
            restaurants = [];
            snapShot.forEach(doc =>{

                if((doc.data().name).toLowerCase().indexOf(searchText) !== -1)
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

export const searchRestaurantByType = (searchText) =>{
    let restaurants = [];
    return(dispatch) =>{
        firebase.firestore().collection("items").orderBy("rating", 'desc')
        .onSnapshot(snapShot =>{
            restaurants = [];
            snapShot.forEach(doc =>{

                if((doc.data().type).toLowerCase().indexOf(searchText) !== -1)
                {
                    console.log(doc.data())
                    restaurants.push({...doc.data(), id: doc.id});
                }
            })
            dispatch({type: "SEARCH_RESTAURANT_SUCCESS", restaurants })
        }, (error) =>{
            dispatch({type: "SEARCH_RESTAURANT_ERROR", searchRestaurantsError: error.message })
        })
    }
}

export const itemsOrder = (data) =>{
    return(dispatch) =>{
        firebase.firestore().collection('orders').add({
            itemsId: data.id,
            price: data.price,
            restaurantId: data.restaurantId,
            userId: data.userId,
            imageURL: data.imageURL,
            itemName: data.name,
            restaurantName: data.restaurantName,
            status: 'pending',
        })
        .then(()=>{
            alert("Successfully submitted");
            dispatch({ type: "ITEMS_ORDER_SUCCESS", itemsOrderError: null})
        })
        .catch((error) =>{
            dispatch({ type: "ITEMS_ORDER_ERROR", itemsOrderError: error.message})
        })
    }
}


export const getAllOrders = (uid) =>{
    let allOrders = []
    return(dispatch) =>{
        firebase.firestore().collection('orders').where("userId", "==", uid)
        .onSnapshot((snapShot) =>{
            allOrders = [];
            snapShot.forEach(doc =>{
                console.log("Hellow")
                allOrders.push({...doc.data(), id: doc.id})
            })
            dispatch({ type: "GET_ALL_ORDERS_SUCCESS", allOrders, getallOrdersError: null });
        }, (error =>{
            dispatch({ type: "GET_ALL_ORDERS_ERROR", getallOrdersError: error.message})
        })
        )
    }
}
