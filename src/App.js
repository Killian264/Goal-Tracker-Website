import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainPage from './GoalTrackerMainPage/App';
import LoginPage from './LoginPage/LoginPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Router>
          <div>
              <PrivateRoute exact path="/" component={MainPage} />
              <Route path="/login" component={LoginPage} />
          </div>
      </Router>
    </div>
  );
}

export default App;
