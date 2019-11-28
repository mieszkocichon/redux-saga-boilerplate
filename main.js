import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'

import { createStore, applyMiddleware, combineReducers } from 'redux'

import Counter from './Counter'
import User from './User'
import Login from './Login'
import reducerCounter from './reducersCounter'
import reducerUser from './reducersUser'
import reducerLogin from './reducersLogin'
import { 
  welcomeSaga, 
  watchIncrementAsync, 
  watchFetchUsers, 
  watchAndLog, 
  loginFlow 
} from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  reducerCounter,
  reducerUser,
  reducerLogin,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(welcomeSaga)
sagaMiddleware.run(watchIncrementAsync)
sagaMiddleware.run(watchFetchUsers)
sagaMiddleware.run(watchAndLog)
sagaMiddleware.run(loginFlow)

const action = (type, data) => store.dispatch({ type, data })

function render() {

  ReactDOM.render(
    <div>
      <Counter
        state={store.getState()}
        onIncrement={() => action('INCREMENT')}
        onDecrement={() => action('DECREMENT')} 
        onIncrementAsync={() => action('INCREMENT_ASYNC')} />

      <hr />

      <User 
        state={store.getState()}
        onFetch={() => action('USER_FETCH_REQUESTED')}
      />

      <hr />

      <Login
        state={store.getState()}
        onLogin={(user, password) => action('LOGIN_REQUEST', { user, password } )}
        onLogout={() => action('LOGOUT')}
      />
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
