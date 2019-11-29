const initialUserState = {
  login: {
    name: '',
    password: ''
  }
}

export default function login(state = initialUserState, action) {
  switch (action.type) {
    default:
      return state;
  }
}