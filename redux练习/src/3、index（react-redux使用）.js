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

/**
 * 连接组件 react和redux的组件责传入store 也不需要subscribe订阅了
 */
import {Provider} from 'react-redux' 

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


