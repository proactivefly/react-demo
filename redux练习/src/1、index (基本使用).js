/*入口文件*/
import React from 'react';
import ReactDOM from 'react-dom';

import {createStore} from 'redux';
import App from './App'
import './redux.js'
import {counter,addGun,removeGun,addGunAnsyc} from './index.redux.js'

const store=createStore(counter)
//用render函数包裹一下  为了store订阅的时候 重新执行render函数
function render(){
    ReactDOM.render(
        <App store={store} addGun={addGun} addGunAnsyc={addGunAnsyc} removeGun={removeGun}/>, 
        document.getElementById('root')
    );
}
render()

store.subscribe(render) //每次状态发生变化重新render


