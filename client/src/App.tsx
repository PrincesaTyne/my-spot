import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './css/pages/App.css';
import Map from './components/Map';
import FavoriteSpots from './components/FavoriteSpots'
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Authentication/Login';
import {AuthProvider} from './components/Authentication/AuthContext' 
import PrivateRoute from './components/Authentication/PrivateRoute'

const App: React.FC = () => {
  return (
    <AuthProvider>
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path='/' exact component={Map} />
          <PrivateRoute path='/favoritespots' component={FavoriteSpots} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
        </Switch>
        <Footer />
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;
