import React from 'react'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
    static propTypes = {
        userlist:PropTypes.array.isRequired
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
    }
    render(){
        console.log(this.props.userlist)
        let list = this.props.userlist.map((v,i)=>{
            return  v.avatar
                    ?
                    <Card key={i} onClick={()=>this.handleClick(v)}>
                        <Card.Header title={v.user}  extra={v.title}
                            thumb={require(`../img/${v.avatar}.png`)}>
                        }
                            
                        </Card.Header>
                        <Card.Body>
                            {v.type=='boss'?<div>公司：{v.company}</div>:null}
                            {v.desc}
                            {v.type=='boss'?<div>薪资：{v.money}</div>:null}
                        </Card.Body>
                    </Card>
                    :
                    null
        })
        return (
             <div>
                 <WingBlank>
                  {list}
                 </WingBlank>
             </div>
          
        )
    }

}

export default UserCard
