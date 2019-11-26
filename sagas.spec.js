import test from 'tape'
import { fetch } from './API'

import { put, call } from 'redux-saga/effects'
import { incrementAsync, delay, fetchUsers } from './sagas'

test('Saga test', (assert) => {
  test('incrementAsync Saga test', (assert) => {
    const gen = incrementAsync()
  
    assert.deepEqual(
      gen.next().value,
      call(delay, 1000),
      'incrementAsync Saga must call delay(1000)'
    )
  
    assert.deepEqual(
      gen.next().value,
      put({type: 'INCREMENT'}),
      'incrementAsync Saga must dispatch an INCREMENT action'
    )
  
    assert.deepEqual(
      gen.next(),
      { done: true, value: undefined },
      'incrementAsync Saga must be done'
    )
  
    assert.end()
  });

  test('fetchUsers Saga test', (assert) => {
    const latestUsers = fetchUsers()
    const users = {}
    const error = {}

    assert.deepEqual(
      latestUsers.next().value,
      call(fetch, 'https://randomuser.me/api/'),
      "fetchUsers should yield an Effect call(Api.fetch, 'https://randomuser.me/api/'"
    )

    assert.deepEqual(
      latestUsers.next(users).value,
      put({ type: 'USERS_RECEIVED', users }),
      "fetchUsers should yield an Effect put({ type: 'USERS_RECEIVED', users })"
    )

    assert.deepEqual(
      latestUsers.throw(error).value,
      put({ type: 'USERS_REQUEST_FAILED', error }),
      "fetchUsers should yield an Effect put({ type: 'USERS_REQUEST_FAILED', error }),"
    )

    assert.end()
  })

  assert.end()
})
