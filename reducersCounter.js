const initialCounterState = {
  counter: {
    value: 0
  }
}

export default function counter(state = initialCounterState, action) {
  const newState = state;

  switch (action.type) {
    case 'INCREMENT':
      newState.counter.value += 1;
      return { ...newState }
    case 'INCREMENT_IF_ODD':
      newState.counter.value = (newState % 2 !== 0) ? newState + 1 : newState
      return { ...newState }
    case 'DECREMENT':
      newState.counter.value -= 1;
      return { ...newState }
    default:
      return state
  }
}