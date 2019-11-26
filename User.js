import React, { PropTypes } from 'react'

const User = ({ state, onFetch }) =>
    <div>
        <button onClick={onFetch}>
            Fetch user
        </button>
        <p></p>
        <div>
            User: {JSON.stringify(state.reducerUser.user.elements.results)}
        </div>
    </div>

User.PropTypes = {
    state: PropTypes.object.isRequired,
    onFetch: PropTypes.func.isRequired
}

export default User