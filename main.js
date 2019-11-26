import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import createSagaMiddleware from 'redux-saga'

import { createStore, applyMiddleware, combineReducers } from 'redux'

import Counter from './Counter'
import User from './User'
import reducerCounter from './reducersCounter'
import reducerUser from './reducersUser'
import { welcomeSaga, watchIncrementAsync, watchFetchUsers } from './sagas';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  reducerCounter,
  reducerUser,
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
)
sagaMiddleware.run(welcomeSaga)
sagaMiddleware.run(watchIncrementAsync)
sagaMiddleware.run(watchFetchUsers)

const action = type => store.dispatch({ type })

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
    </div>,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)
