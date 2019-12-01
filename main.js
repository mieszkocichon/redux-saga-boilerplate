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
  loginFlow,
} from './shared/state/sagas/sagas';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  useHistory,
  useLocation
} from "react-router-dom";

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

function Login({ state, onLogin, onLogout }) {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  function handleSubmit(event) {
    event.preventDefault();
  }

  function onSendLoginRequest() {
    onLogin(state.reducerLogin.login.name, state.reducerLogin.login.password)
    history.replace(from);
  }

  function onSendLogoutRequest() {
    state.reducerLogin.login.name = ""
    state.reducerLogin.login.password = ""
    onLogout()
  }

  function onNameChange(event) {
    if (state.reducerLogin.login) {
      state.reducerLogin.login.name = event.target.value;
    }
  }

  function onPasswordChange(event) {
    if (state.reducerLogin.login) {
      state.reducerLogin.login.password = event.target.value;
    }
  }

  return (
    <div>
      <NavLink to="/">home</NavLink>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={onNameChange} />
        </label>

        <label>
          Password:
          <input type="password" onChange={onPasswordChange} />
        </label>

        <button onClick={onSendLoginRequest}>Login</button>
        <button onClick={onSendLogoutRequest}>Logout</button>
      </form>
    </div>
  );
}

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
          ></Login>
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
