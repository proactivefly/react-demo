import React, { Component } from 'react';
import { Button } from 'antd-mobile';
import {addGun,addGunAnsyc,removeGun} from './index.redux'
/**
 * connect 负责从外部获取【当前组件】所需要的参数 包括 state  一些方法都塞入props里  
 */
import {connect} from 'react-redux'


// 11111111111111-不用装饰器写法
const mapStateProps=(state)=>{
    return{num:state}
}
const actionCreators={
    addGun,
    removeGun,
    addGunAnsyc
}

App=connect(mapStateProps,actionCreators)(App)

/**2222222222222222222
 * 装饰器模式
 * connect 里
 *  第一个参数是 你要把state里的什么属性放到props
    第二个参数是把什么方法放到props，自动dispatch
    上边就是直接this.props调用了 这里先安装 npm install babel-plugin-transform-decorators-legacy --save-dev
    【这个东西就是装饰器 方便写@connect】
    再在package.json 里修改plugin
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
@connect(
    state =>({num:state.counter}),
    {addGun,removeGun,addGunAnsyc}
)


class App extends Component {

    render() {
       
        return (
            <div>
                <Button type="primary" size="small" onClick={this.props.addGun}>申请武器</Button>
                <Button type="primary" size="small" onClick={this.props.removeGun}>上交武器</Button>
                <Button type="primary" size="small" onClick={this.props.addGunAnsyc}>拖两天再给</Button>

                <h1>现在有机枪{this.props.num}把</h1>
            </div>
        )
    }
}

export default App;

