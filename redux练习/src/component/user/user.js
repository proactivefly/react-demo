import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'
@connect(
    state => state.user,
    {logoutSubmit}
)


//页面初始的时候已经在authroute里面 取得了user的信息放入state中了
class User extends React.Component{
    logOut(){
      
     const alert = Modal.alert
     alert('注销', 'Are you sure???', [
        { text: 'Cancel', onPress: () => console.log('cancel'), style: 'default' },
        { text: 'OK', onPress: () => {
            // npm install browser-cookies --save
           browserCookie.erase('userid')
            //强制刷新页面   
           //window.location.href = window.location.href
           this.props.logoutSubmit()
        } },
      ]);
    }  
    render(){
        const Item = List.Item
        const Brief = Item.Brief
        console.log(this.props)
        return (
          
                 this.props.user ? 
                     (
                        <div>
                            <Result img={<img src={require(`../img/${this.props.avatar}.png`)} />}  
                              title={this.props.user}    
                              message = {this.props.type=='boss'?this.props.company:null}         
                            />
                            <List renderHeader={()=>'简介'}>
                                <Item>
                                    {this.props.title}
                                    <Brief>{this.props.desc}</Brief>
                                    {this.props.money?<Brief>薪资:{this.props.money}</Brief> : null}
                                </Item>
                            </List>

                            <WhiteSpace></WhiteSpace>
                            <List>
                                <Item onClick={this.logOut.bind(this)}>退出登213录</Item>
                            </List>
                            <h3 onClick={this.logOut.bind(this)}>test</h3>
                        </div>
                     )
                     :
              
                     <Redirect to = {this.props.redirect} />
             
        )
    }

}

export default User

