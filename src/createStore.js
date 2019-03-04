import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Model from './models';
import logger from 'redux-logger';

const NODE_ENV = process.env.NODE_ENV;
const sagaMiddleware = createSagaMiddleware();

let middleWares = [];
if (NODE_ENV == 'development') {
  middleWares = [
    sagaMiddleware,
    logger
  ]
} else {
  middleWares = [
    sagaMiddleware
  ]
}
let store = createStore(Model.rootReducer, undefined, compose(
  applyMiddleware(...middleWares),
));

export default function configureStore() {
  // 运行saga
  sagaMiddleware.run(Model.rootSaga);
  return { store }
}