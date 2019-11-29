import { put, call, takeEvery, takeLatest, take, fork, cancelled, cancel} from 'redux-saga/effects'
import { fetch, authorizeUser, storeItem, clearItem } from '../../../API'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() {
    yield call(delay, 1000)
    yield put({ type: 'INCREMENT' })
}

export function* welcomeSaga() {
    console.log('Welcome!')
}

export function* watchIncrementAsync() {
    yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

export function* fetchUsers() {
    try {
        const users = yield call (fetch, 'https://randomuser.me/api/')
        yield put({ type: 'USERS_RECEIVED', users })
    }
    catch (error) {
        yield put({ type: 'USERS_REQUEST_FAILED', error })
    }
}

export function* watchFetchUsers() {
    yield takeLatest('USER_FETCH_REQUESTED', fetchUsers)
}

export function* watchAndLog() {
    yield takeEvery('*', function* logger(action) {
        console.log('action', action)
    })
}

export function* authorize(user, password) {
    try {
        const token = yield call(authorizeUser, user, password)
        yield put({ type: 'LOGIN_SUCCESS', token })
        yield call(storeItem, { token })
        return token
    }
    catch (error) {
        yield put({ type: 'LOGIN_ERROR', error})
    }
    finally {
        if (yield cancelled()) {

        }
    }
}

export function* loginFlow() {
    while (true) {
        const { data } = yield take('LOGIN_REQUEST')

        const { user, password } = data;

        const task = yield fork(authorize, user, password)
        const action = yield take(['LOGOUT', 'LOGIN_ERROR'])
        if (action.type === 'LOGOUT') {
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
