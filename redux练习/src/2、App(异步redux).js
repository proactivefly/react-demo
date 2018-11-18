import React, { Component } from 'react';
import {addGun,removeGun,addGunAnsyc} from './index.redux'

class App extends Component {

    render() {
        const store=this.props.store;
        const num=store.getState()
        const addGun=this.props.addGun
        const removeGun=this.props.removeGun
        const addGunAnsyc=this.props.addGunAnsyc
        return (
            <div>
                <button type="primary" size="small" onClick={()=>store.dispatch(addGun())}>申请武器</button>
                <button type="primary" size="small" onClick={()=>store.dispatch(removeGun())}>上交武器</button>
                <button type="primary" size="small" onClick={()=>store.dispatch(addGunAnsyc())}>拖两天</button>
                <h1>现在有机枪{num}把</h1>
            </div>
        )
    }
}

export default App;

