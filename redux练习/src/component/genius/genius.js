import React from 'react'
import axios from 'axios'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux'
import {getUserList} from '../../redux/chatuser.redux.js'
import UserCard from '../usercard/usercard.js'

@connect(
    state => state.chatuser,
    {getUserList}
)

class Genius extends React.Component{
    componentDidMount(){
        this.props.getUserList('boss')
        console.log(this.props.userList)
    }
    render(){
        return <UserCard userlist={this.props.userList}></UserCard>
    }

}

export default Genius

