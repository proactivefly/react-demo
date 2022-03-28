
import {call,put,select,takeEvery} from "redux-saga/effects"
import {ASYNC_INCREMENT} from '../constant'

export default function *(){
    console.log("saga")

    yield takeEvery(ASYNC_INCREMENT,function*(){
        console.log('takeEvery')
    })
}