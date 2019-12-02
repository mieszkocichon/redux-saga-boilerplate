import { LOGIN_ACTIONS } from '../../actions/Login'

const initialUserState = {
  login: {
    name: '',
    password: ''
  }
}

export default function login(state = initialUserState, action) {
  switch (action.type) {
    case LOGIN_ACTIONS.LOGIN:
      console.log('U are log in!')
    case LOGIN_ACTIONS.LOGOUT:
      console.log('U are log out!')
    default:
      return state;
  }
}