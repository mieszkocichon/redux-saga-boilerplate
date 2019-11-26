import { put, call, takeEvery } from 'redux-saga/effects'

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

export default function* rootSaga() {
    yield([
        welcomeSaga(),
        watchIncrementAsync()
    ])
}
