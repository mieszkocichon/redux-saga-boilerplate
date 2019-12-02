import { USER_ACTIONS } from '../../actions/User'

const initialUserState = {
  user: {
    elements: {}
  }
}

export default function user(state = initialUserState, action) {
  const newState = state

  switch (action.type) {
    case USER_ACTIONS.RECEIVED:
      newState.user.elements = action.users;

      return { ...newState }
    default:
      return state
  }
}