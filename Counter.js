/*eslint-disable no-unused-vars */
import React, { Component, PropTypes } from 'react'

const Counter = ({ state, onIncrement, onDecrement, onIncrementAsync }) =>
      <div>
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
