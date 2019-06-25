import React from 'react'; 
import {  BrowserRouter, Route, Switch } from 'react-router-dom';
import Registration from './screens/registration/index';
import UserRegistration from './screens/registration/userRegistration';
import RestaurantRegistration from './screens/registration/restaurantRegistration';
import Login from './screens/login';
// import Restorent from './pages/admin';
import User from './screens/user/dashboard';

const Routes = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path = "/" component = {Login} />
                <Route path = "/signin" component = {Login} />
                <Route exact path = "/registration" component = {Registration} />
                <Route path = "/registration/user" component={UserRegistration}/>
                <Route path = "/registration/restaurant" component={RestaurantRegistration}/>
                {/* <Route path = "/admin" component = {Admin} /> */}
                <Route path = "/user" component = { User } />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;