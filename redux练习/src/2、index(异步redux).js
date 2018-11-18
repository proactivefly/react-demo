/*入口文件*/
import React from 'react';
import ReactDOM from 'react-dom';
/**
 *  applyMiddleware专门用来管理中间件
 */
import {createStore,applyMiddleware} from 'redux';
import App from './App'
import './redux.js'
import {counter,addGun,removeGun,addGunAnsyc} from './index.redux.js'
import thunk from 'redux-thunk'   //专用于处理redux异步 插件，（川课） 

/**
 * 这里用了combineReducer  合并了auth.redux.js index.redux.js里两个reducer
  compose这里这第一参数是异步中间件（不用中间件只能处理同步action，中间件用来处理异步），第二个是chorme插件配置
 * @param  {[type]} f [description]
 * @return {[type]}   [description]
 */
const store = createStore(counter,applyMiddleware(thunk))






  //用render函数包裹一下  为了store订阅的时候 重新执行render函数
  function render(){
      ReactDOM.render(
          <App store={store} addGun={addGun} addGunAnsyc={addGunAnsyc} removeGun={removeGun}/>, 
          document.getElementById('root')
      );
  }
  render()

  store.subscribe(render) //每次状态发生变化重新render



