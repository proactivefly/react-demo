/*入口文件*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
/**
 *  applyMiddleware专门用来管理中间件
 *  compose  组合函数，对几个函数进行组合
 */
import {createStore,applyMiddleware,compose} from 'redux';

import thunk from 'redux-thunk'   //专用于处理redux异步 插件，（川课） 
/*引入合并后的reduce*/
import combineReducers from './reducer' 

/**
 * 连接组件 react和redux的组件责传入store 也不需要subscribe订阅了
 */
import {Provider} from 'react-redux' 

import registerServiceWorker from './registerServiceWorker';

import './config' //axios全局配置

/**
 * 引入reduct-router
 * BrowserRouter 组件内只能一个根元素
 * Router渲染对应组件
 * Redirect 组件跳转
 * Switch 根据条件只渲染  【匹配的】第一个一个组件
 */
import { BrowserRouter,Route,Redirect,Switch} from 'react-router-dom'


/**
 * 引入主组件
 */
import MyApp from './container/myApp/myApp'

import './App.css'

/**
 * 这里用了combineReducer  合并了auth.redux.js index.redux.js里两个reducer
  compose这里这第一参数是异步中间件（不用中间件只能处理同步action，中间件用来处理异步），第二个是chorme插件配置
 * @param  {[type]} f [description]
 * @return {[type]}   [description]
 */
const store = createStore(combineReducers,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))


console.log('store的初始值是：' + JSON.stringify(store.getState(),null,2))

/**
 * [store 挂在组件]
 * @type {Object}
 */
ReactDOM.render(
	
    (<Provider store={store}>
        <MyApp></MyApp>
     </Provider>),        
    document.getElementById('root')
)

registerServiceWorker();



//分为登录页和主页  做权限校验
//import Auth from './Auth.js'
//import Dashbord from './Dashbord'



//---------------------------------------reacr-redux 对比----------------------------------------------- 
/**
 * 使用react-redux 方便了很多 Provider只在入口页面写一次 负责传入store 也不需要subscribe订阅了
 */
/**
 * 引入react -redux 时写法
 */

/*
 ReactDOM.render(
          (<Provider store={store}>
              <BrowserRouter>
                //只能有一个div,exact为完整匹配
                <div>
                    <Switch>
                        <Route exact path='/Auth' component={Auth}></Route>
                        <Route path='/Dashbord' component={Dashbord}></Route>                 
                        <Redirect to='/Dashbord'></Redirect> //如果都没匹配到,重定向到dashbord
                    </Switch>
                </div>
              </BrowserRouter>
           </Provider>),        
          document.getElementById('root')
  )
  */

/*function dashbord(){
  return <h2>dashbord</h2>
}*/