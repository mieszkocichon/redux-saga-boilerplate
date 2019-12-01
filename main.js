import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'

import { createStore, applyMiddleware, combineReducers } from 'redux'

import reducerCounter from './shared/state/reducers/Counter/reducersCounter'
import reducerUser from './shared/state/reducers/User/reducersUser'
import reducerLogin from './shared/state/reducers/Login/reducersLogin'
import { 
  welcomeSaga, 
  watchIncrementAsync, 
  watchFetchUsers, 
  watchAndLog, 
  loginFlow 
} from './shared/state/sagas/sagas';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import Login from './screens/App/screens/Authorize/Login/components/Login'
import User from './screens/App/screens/User/components/User'
import Counter from './screens/App/screens/Counter/components/Counter'

import PrivateRoute from './shared/auth/screens/Auth/components/PrivateRoute'

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  reducerCounter,
  reducerUser,
  reducerLogin,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(sagaMiddleware)),
)
sagaMiddleware.run(welcomeSaga)
sagaMiddleware.run(watchIncrementAsync)
sagaMiddleware.run(watchFetchUsers)
sagaMiddleware.run(watchAndLog)
sagaMiddleware.run(loginFlow)

const action = (type, data = {}) => store.dispatch({ type, data })

function render() {

  ReactDOM.render(
    <Router>
      <Switch>
        <PrivateRoute state={store.getState()} path="/counter">
          <Counter
            state={store.getState()}
            onIncrement={() => action('INCREMENT')}
            onDecrement={() => action('DECREMENT')} 
            onIncrementAsync={() => action('INCREMENT_ASYNC')} />
        </PrivateRoute>

        <PrivateRoute state={store.getState()} path="/user">
          <User 
            state={store.getState()}
            onFetch={() => action('USER_FETCH_REQUESTED')}
          />
        </PrivateRoute>

        <Route path="/login">
          <Login
            state={store.getState()}
            onLogin={(user, password) => action('LOGIN_REQUEST', { user, password } )}
            onLogout={() => action('LOGOUT')}
            />
        </Route>

        <Route path="/">

          <NavLink to="/login">
            Login
          </NavLink>

          &nbsp;

          <NavLink to="/counter">
            Counter
          </NavLink>

          &nbsp;
          
          <NavLink to="/user">
            User
          </NavLink>
        </Route>
      </Switch>
    </Router>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
