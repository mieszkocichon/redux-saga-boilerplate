import React from 'react'
import PropTypes from 'prop-types'

import {
  Route,
  Redirect
} from "react-router-dom";

const PrivateRoute = ({ state, children, ...rest }) =>
  <Route
    {...rest}
    render={({ location }) =>
    state.reducerLogin.login.name != "" ? (
      children
    ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location }
          }}
        />
      )
    }
  />

PrivateRoute.propTypes = {
    state: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
}

export default PrivateRoute