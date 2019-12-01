const initialUserState = {
  login: {
    name: '',
    password: ''
  }
}

export default function login(state = initialUserState, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      console.log('U are log in!')
    case 'LOGOUT':
      console.log('U are log out!')
    default:
      return state;
  }
}