/*eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const Counter = ({ state, onIncrement, onDecrement, onIncrementAsync }) =>
      <div>
        <NavLink to="/">home</NavLink>

        <button onClick={onIncrementAsync}>
          Increment after 1 second
        </button>
        {' '}
        <button onClick={onIncrement}>
          Increment
        </button>
        {' '}
        <button onClick={onDecrement}>
          Decrement
        </button>
        <p></p>
        <div>
          Clicked: {state.reducerCounter.counter.value} times
        </div>
      </div>

Counter.propTypes = {
  state: PropTypes.object.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrementAsync: PropTypes.func.isRequired,
}

export default Counter
