import {takeEvery,put,select,call} from "redux-saga/effects"
import {ASYNC_INCREMENT} from "./constant"
export default function*(){
    console.log('——————————saga执行————————————')
    yield takeEvery(ASYNC_INCREMENT,function(){
        console.log("takeEvery")
    })
}