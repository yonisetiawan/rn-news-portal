import { put } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import SearchActions from '../Redux/SearchRedux'

export function * updateSearchParameter ({ searchTerm }) {
  yield delay(500)
  yield put(SearchActions.searchSuccess(searchTerm))
}
