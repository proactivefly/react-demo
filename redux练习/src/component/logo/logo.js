import React, { Component } from 'react';
import logImg from './logo.jpg'
import './logo.css'
class Logo extends Component{
    render(){
        return (
            <div className="logo-container">
                <img src={logImg} />
            </div>
        )
    }
}

export default Logo
