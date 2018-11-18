const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

//reducer  
export function counter(state = 0 , action){
    switch(action.type){
        case ADD_GUN:
            return state + 1
        case REMOVE_GUN:
            return state - 1
        default:
            return 10
    }
}


//***同步不用dispatch react-redux帮我们做了***
// 异步需要手动的dispatch  不管同步异步 都要通过dispatch修改action 只有action能告诉reducer 如何改变state

//Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。多数情况下，type 会被定义成字符串常量。

export function addGun(){
    return {type:ADD_GUN}
}

export function removeGun(){
    return {type:REMOVE_GUN}
}
//异步操作state
export function addGunAnsyc(){
    return dispatch=>{
        setTimeout(() => {
            dispatch(addGun())
        }, 2000)
    }
}
