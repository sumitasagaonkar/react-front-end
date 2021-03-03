import React from 'react';
import './App.css';
import HomeApp from './HomeApp';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavApp from './NavApp';
import LogInApp from './LogInApp';
import { useHistory } from 'react-router-dom'
import RegisterApp from './RegisterApp';
import LogOut from './LogOut'



function App() {
  const history = useHistory();
  return (
    <div >

      <Router>


        <Switch>

          <Route path='/login' component={LogInApp} />
          <Route path='/Register' component={RegisterApp} histroyy={history} />
          <Route path='/' exact component={HomeApp} />
          <Route path='/logout' component={LogOut} />
        </Switch>
      </Router>


    </div>
  );
}

export default App;
