import { COUNTER_ACTIONS } from '../../actions/Counter'

const initialCounterState = {
  counter: {
    value: 0
  }
}

export default function counter(state = initialCounterState, action) {
  const newState = state;

  switch (action.type) {
    case COUNTER_ACTIONS.INC:
      newState.counter.value += 1;
      return { ...newState }
    case COUNTER_ACTIONS.INC_IF_ODD:
      newState.counter.value = (newState % 2 !== 0) ? newState + 1 : newState
      return { ...newState }
    case COUNTER_ACTIONS.DEC:
      newState.counter.value -= 1;
      return { ...newState }
    default:
      return state
  }
}