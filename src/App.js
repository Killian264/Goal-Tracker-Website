import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainPage from './GoalTrackerMainPage/App';
import LoginPage from './LoginPage/LoginPage'
import PrivateRoute from './components/PrivateRoute'

function App() {
  var test = true;
  return (
    <div className="App">
      <Router>
          <div>
              <PrivateRoute exact path="/" component={MainPage} />
              <Route exact path="/login" render={(props) => <LoginPage {...props} registering={false}/>} />
              <Route exact path="/register" render={(props) => <LoginPage {...props} registering={true}/>} />
          </div>
      </Router>
    </div>
  );
}

export default App;
