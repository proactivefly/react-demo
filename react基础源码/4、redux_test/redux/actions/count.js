/* 
	该文件专门为Count组件生成action对象
*/
import {INCREMENT,DECREMENT,ASYNC_INCREMENT} from '../constant'

//同步action，就是指action的值为Object类型的一般对象
export const increment = data => ({type:INCREMENT,data})
export const decrement = data => ({type:DECREMENT,data})
export const asyncIncrement = data=>({type:ASYNC_INCREMENT,data}) 