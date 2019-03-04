import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';

const context = require.context('./', true, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
// 获取所有的saga
let rootSaga = keys.map((item) => {
  let defaultData = require(`./${item.replace('./', '')}`).default;
  if (defaultData) {
    if (defaultData.saga && (typeof defaultData.saga == 'function')) {
      return defaultData.saga();
    }
  }
})
// 获取所有的reducer
let reducerObj = {};
keys.forEach((item) => {
  let defaultData = require(`${item}`).default;
  if (defaultData) {
    let nameSpace = defaultData.nameSpace;
    let reducer = defaultData.reducer;
    // if (!nameSpace || !reducer) {
    //   throw new Error('model文件内必须定义nameSpace 或者 reducer, now is undefined');
    // }
    reducerObj[nameSpace] = reducer || function () {};
  }
})
const rootReducer = combineReducers(reducerObj);
export default {
  rootSaga: function* () {
    yield all(rootSaga);
  },
  rootReducer: rootReducer
}