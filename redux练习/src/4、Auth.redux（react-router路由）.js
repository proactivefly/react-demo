import axios from 'axios'
const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'
const USERDATA = 'USERDATA'


const init = { //state的初始值
    isAuth:false,
    user:'李云龙',
    age:20
}

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 * **/
export function auth(state = init ,action){ 
    console.log('auth.redux.js里的 state ： ' + JSON.stringify(state))
    console.log('auth.redux.js里的 action ： ' + JSON.stringify(action))
    switch(action.type){
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
        case USERDATA:
           return {   //展开后重新对uesr,age赋值
                ...state,
                user:action.payload.user,
                age:action.payload.age
            }
        default :
            return state
    }
}

/**
 * 唯一可以改变state数据的 方法 actions
 * @return {[type]} 返回的是普通对象
 */
export function login(){
    return {type:LOGIN}
}

export function logout(){
    return {type:LOGOUT}
}

//可传入一个载荷 将在reducer的action中体现
export function userData(data){
    return {type:USERDATA,payload:data}
}
//建立一个异步的action 因为数据传输是异步的 需要手动dispatch
export function getUserData(){
    return dispatch=>{

        // 请求数据并更新
        axios.get('/data').then(res=>{
            if(res.status === 200){
                dispatch(userData(res.data))
            }   
        })

        
    }
}
