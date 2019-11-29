const initialUserState = {
  user: {
    elements: {}
  }
}

export default function user(state = initialUserState, action) {
  const newState = state

  switch (action.type) {
    case 'USERS_RECEIVED':
      newState.user.elements = action.users;

      return { ...newState }
    default:
      return state
  }
}