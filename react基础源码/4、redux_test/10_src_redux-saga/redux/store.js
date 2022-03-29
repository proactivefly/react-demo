
import {createStore,applyMiddleware} from 'redux'
import reducer from './reducers'
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas.js'
const sagaMiddleware=createSagaMiddleware()
export default createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(sagas)