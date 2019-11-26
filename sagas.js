import { put, call, takeEvery, takeLatest } from 'redux-saga/effects'
import { fetch } from './API'

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
        watchFetchUsers()
    ])
}
