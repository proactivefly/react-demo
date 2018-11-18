
/*这个redux文件是干什么用的呢？ 它应该是通过authroute点击注册后 存储用户信息并发送给后台*/
import axios from 'axios'
import {getRedirectPath} from '../util'
const REGISTER_SUCCESS='REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const LOGOUT = 'LOGOUT'


//redirectTo 字段代表登录后跳转哪个页面 跳转的页面由用户的身份，信息是否填写完整确定
const initState = {
    redirectTo:'',
   // isAuth:false,
    user:'',
    msg:'',
    pwd:'',
    type:''
}


//reducers 成功后，最主要的是dispath过来将isAuth设置为true,将registerSuccess的负载放入state中
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS: 
            return {...state,redirectTo:getRedirectPath(action.payload),msg:'',...action.payload}
        case LOAD_DATA: 
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.payload}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default :
            return state
    }
}

export function register({user,pwd,repeatPwd,type}){
    if(!user || !pwd){
        return errorMsg('用户名或者密码不能为空！')
    }

    if(repeatPwd != pwd){
        return errorMsg('两次密码输入不一致')
    }
    //成功dispatch 用户信息   失败dispacth失败信息（后端来定）
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then(res=>{
            if(res.status == 200 && res.data.code ==0){
                dispatch(authSuccess({user,pwd,type}))
            }
            else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg('用户名或者密码不能为空！')
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(res=>{
            if(res.status == 200 && res.data.code ==0){
                console.log(res.data.data)
                dispatch(authSuccess(res.data.data))
            }
            else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    } 
}


export function update(data){
    return dispatch=>{
        axios.post('/user/update',data).then(res=>{
            if(res.status == 200 && res.data.code ==0){
                console.log(res.data.data)
                dispatch(authSuccess(res.data.data))
            }
            else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    } 
}


export function logoutSubmit(){
    return {type:LOGOUT}
}


export function loadData(userinfo){       
    return {type:LOAD_DATA,payload:userinfo}
}


function errorMsg(msg){
    return {type:ERROR_MSG,payload:msg}
}

function authSuccess(data){
    return {type:AUTH_SUCCESS,payload:data}
}

// function loginSuccess(data){
//     return {type:LOGIN_SUCCESS,payload:data}
// }

// function updateSuccess(data){
//     return {type:UPDATE_DATA,payload:data}
// }
