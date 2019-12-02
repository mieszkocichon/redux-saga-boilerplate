import { put, call, takeEvery, takeLatest, take, fork, cancelled, cancel} from 'redux-saga/effects'
import { fetch, authorizeUser, storeItem, clearItem } from '../../../API'

import { COUNTER_ACTIONS } from '../actions/Counter'
import { USER_ACTIONS } from '../actions/User'
import { LOGIN_ACTIONS } from '../actions/Login'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: COUNTER_ACTIONS.INC })
}

export function* welcomeSaga() {
    console.log('Welcome!')
}

export function* watchIncrementAsync() {
    yield takeEvery(COUNTER_ACTIONS.INC_ASYNC, incrementAsync)
}

export function* fetchUsers() {
    try {
        const users = yield call (fetch, 'https://randomuser.me/api/')
        yield put({ type: USER_ACTIONS.RECEIVED, users })
    }
    catch (error) {
        yield put({ type: USER_ACTIONS.REQUEST_FAILED, error })
    }
}

export function* watchFetchUsers() {
    yield takeLatest(USER_ACTIONS.FETCH_REQUESTED, fetchUsers)
}

export function* watchAndLog() {
    yield takeEvery('*', function* logger(action) {
        console.log('action', action)
    })
}

export function* authorize(user, password) {
    try {
        const token = yield call(authorizeUser, user, password)
        yield put({ type: LOGIN_ACTIONS.LOGIN, token })
        yield call(storeItem, { token })
        return token
    }
    catch (error) {
        yield put({ type: LOGIN_ACTIONS.ERROR, error})
    }
    finally {
        if (yield cancelled()) {

        }
    }
}

export function* loginFlow() {
    while (true) {
        const { data } = yield take(LOGIN_ACTIONS.LOGIN_REQUEST)

        const { user, password } = data;

        const task = yield fork(authorize, user, password)
        const action = yield take([LOGIN_ACTIONS.LOGIN_REQUEST, LOGIN_ACTIONS.LOGIN_ERROR])
        if (action.type === LOGIN_ACTIONS.LOGOUT) {
            yield cancel(task)
        }
        yield call(clearItem, 'token')
    }
}

export default function* rootSaga() {
    yield([
        welcomeSaga(),
        /**
         * * Increment 
         */
        watchIncrementAsync(),
        /**
         * * Fetch users
         */
        fetchUsers(),
        watchFetchUsers(),
        /**
         * * Login
         */
        loginFlow(),
    ])
}
