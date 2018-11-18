import axios from 'axios'
import io from 'socket.io-client'
   //因为后台在9093 前台在3000 跨域 需要手动指定下
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg:[],
    users:{},
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>!v.read && v.to==action.payload.userid ).length}
        case MSG_RECV:
            //未读信息 要看发送人的id 是否和 state里的ID一样
            const n = action.payload.to == action.userid?1:0
            //聊天信息列表 每次接受都放在state
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+n}
        case MSG_READ:
        default:
            return state
    }
}
//聊天列表
function msgList(msgs,users,userid){
    return {type:MSG_LIST,payload:{msgs,users,userid}}
}
//单独的每条聊天数据
function msgRecv(msg,userid){
    return {type:MSG_RECV,payload:msg,userid:userid}
}

export function getMsgList(){
    //可以有2个参数   getState获取state下所有数据
    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then(res=>{
            if(res.status==200 && res.data.code==0){
                //console.log('getState',getState())
                const userid = getState().user._id;
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}

//发送信息
export function sendMsg({from ,to ,msg}){
    return dispatch=>{
        //server.js做监听
        socket.emit('sendmsg',{from,to,msg})
    }
    
}
//接受信息
export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            console.log('recvmsg',data)
            const userid = getState().user._id;
            dispatch(msgRecv(data,userid))
        })
    }
}
