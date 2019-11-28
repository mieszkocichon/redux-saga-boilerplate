import React, { PropTypes } from 'react'

const Login = ({ state, onLogin, onLogout }) => {
  function handleSubmit(event) {
    event.preventDefault();
  }

  function onSendLoginRequest() {
    onLogin(state.reducerLogin.login.name, state.reducerLogin.login.password) 
  }

  function onSendLogoutRequest() {
    onLogout()
  }

  function onNameChange(event) {
    if (state.reducerLogin.login) {
      state.reducerLogin.login.name = event.target.value;
    }
  }

  function onPasswordChange(event) {
    if (state.reducerLogin.login) {
      state.reducerLogin.login.password = event.target.value;
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" onChange={onNameChange} />
        </label>

        <label>
          Password:
          <input type="password" onChange={onPasswordChange} />
        </label>

        <button onClick={onSendLoginRequest}>Login</button>
        <button onClick={onSendLogoutRequest}>Logout</button>
      </form>
    </div>
  )
}

Login.PropTypes = {
  state: PropTypes.object.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired
}

export default Login