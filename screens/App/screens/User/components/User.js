import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

const User = ({ state, onFetch }) =>
    <div>
        <NavLink to="/">home</NavLink>
        <button onClick={onFetch}>
            Fetch user
        </button>
        <p></p>
        <div>
            User: {JSON.stringify(state.reducerUser.user.elements.results)}
        </div>
    </div>

User.propTypes = {
    state: PropTypes.object.isRequired,
    onFetch: PropTypes.func.isRequired
}

export default User