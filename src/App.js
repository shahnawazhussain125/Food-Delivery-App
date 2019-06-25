import React, { Component } from 'react';
import Header from './components/Header';
import Registration from './screens/registration/userRegistration';
import Login from './screens/login';
import UserDashboard from './screens/user/dashboard';
import Routes from './routes';

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <Routes/>
      </div>
    )
  }
}

export default App;
