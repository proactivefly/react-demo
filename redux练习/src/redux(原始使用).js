import {createStore} from 'redux';
//1.新建store
//通过reducer建立
//根据老的state 和 action 生成新的state

function counter(state = 0 , action){
    switch(action.type){
        case '加机关枪':
            return state + 1
        case '减机关枪':
            return state - 1
        default:
            return 10
    }
}
//新建store
const store = createStore(counter)
//得到初始的state
const Init = store.getState();
console.log(Init) //10

function linsener(){
    const current = store.getState();
    console.log(`现在有机关枪${current}把`)
}
//订阅 每次变化都会触发
store.subscribe(linsener)

//派发事件 传递action
store.dispatch({type:'加机关枪'})
//console.log(store.getState())//11

store.dispatch({type:'减机关枪'})
//console.log(store.getState())//10





