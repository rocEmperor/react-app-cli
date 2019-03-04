import { all, takeEvery, put, select } from 'redux-saga/effects';

const initState = {
  name: '朋爷',
  count: 1
};
const nameSpace = 'homeModel';
export default {
  nameSpace: nameSpace,
  reducer: function (state = initState, action) {
    switch (action.type) {
      case `${nameSpace}/concat`:
        return {...state, ...action.payload}
      default:
        return state
    }
  },
  saga: function* () {
    yield all([
      yield takeEvery(`${nameSpace}/addCount`, this.effect.addCount),
    ])
  },
  effect: {
    addCount: function*( { payload } ){
      let homeModel = yield select(state => state.homeModel);
      let { count } = homeModel;
      try {
        yield put({
          type: `${nameSpace}/concat`,
          payload: {
            count: count + 1
          }
        })
      } catch (error){}
    },
  }
}