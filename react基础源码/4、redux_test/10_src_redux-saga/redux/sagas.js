import {takeEvery,put,select,call} from "redux-saga/effects"
import {ASYNC_INCREMENT} from "./constant"
import {increment} from "./actions/count"

// 
function * saga(){
    console.log('——————————saga执行————————————')
    yield takeEvery(ASYNC_INCREMENT,function*(action){
        console.log("——————————执行takeEvery——————————")
         yield put(increment(action.data*1))
    })
    console.log(yield select())
}


export default saga