import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './css/pages/App.css';
import Map from './pages/Map';
import FavoriteSpots from './pages/FavoriteSpots'
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import About from './pages/About';
import Login from './pages/Login';
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
