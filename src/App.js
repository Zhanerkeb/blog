import React from 'react';
import './App.css';
import {Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import Signup from './containers/signup'
import Signin from './containers/signin'
import 'antd/dist/antd.css';
import configureStore from './store';
import {Provider} from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode'
import * as types from './actions/types'
import Dashboard from './containers/dashboard';

const store = configureStore()

if (localStorage.token) {
  setAuthToken(localStorage.token);
  const decoded = jwt_decode(localStorage.token);
  store.dispatch({type: types.SET_CURRENT_USER, payload: decoded});
  const currentTime = Date.now()/1000;
  if (decoded.exp < currentTime) {
    localStorage.removeItem('token');
    setAuthToken(false);
    store.dispatch({type: types.SET_CURRENT_USER, payload: {}});
    window.location.href = '/signin';
  }
}
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
              <Route exact path={'/signup'} component={Signup}/>
              <Route exact path={'/signin'} component={Signin}/>
              <Route path={'/dashboard'} component={Dashboard}/>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}


export default App;
