import {ADD_PERSON} from '../constant'

//初始化人的列表
const initState = [{id:'001',name:'tom',age:18}]

export default function personReducer(preState=initState,action){
	// console.log('personReducer@#@#@#');
	const {type,data} = action
	switch (type) {
		case ADD_PERSON: //若是添加一个人
			return [data,...preState]
		default:
			return preState
	}
}


// 函数节流
function throttle (fn,time){
	let lastTime=0
	return function(){
		let nowTime=Date.now()
		if(nowTime-lastTime>time){
			fn.call(this)
			lastTime=nowTime
		}
	}
}

// 函数防抖
function debounce(fn,time){
	// 记录上一次延时器
	let timer=null
	return function(){
		// 清除上一次延时器
		clearTimeout(timer)
		// 声明这次延时器
		timer=setTimeout(()=>{
			fn.apply(this)
		},time)
	}
}