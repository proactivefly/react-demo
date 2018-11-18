//后端的路由文件 配置都在 /user下

const express = require('express')
const Router = express.Router()

const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')

Router.get('/list',function(req,res){
    // User.remove({},function(err,doc){
    //      if(!err){
    //         console.log(doc)
    //     }
    // })
    //获取type 是 boss 还是 genius
    const {type} = req.query
    //{type:type} 也可以简写成{type}
    User.find({type},function(err,doc){
         return res.json({code:0,data:doc})
    })
})

Router.post('/register',function(req,res){
    const {user, pwd,type} = req.body
    User.findOne({user:user},function(err,doc){
        if(doc){
            return res.json({code:1,msg:'用户名重复'})
        }
        const userModel = new User({user,type,pwd})
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,type,_id} = doc
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })

        // User.create({user,pwd,type},function(err,doc){
        //     if(err){
        //         return res.json({code:1,msg:'后端出错了'})
        //     }
        //     return res.json({code:0})
        // })
    })
})


Router.post('/login',function(req,res){
    const {user, pwd} = req.body
    //第二个参数是回显的时候将pwd 设置为0就是不显示 不让用户看到密码
    User.findOne({user,pwd},{'pwd':0},function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        //登录成功后 将cookie存储  用到cookie-parser
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})

Router.get('/info',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }
    User.findOne({_id:userid},{pwd:0},function(err,doc){
        if(err){
            return res.json({code:1,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
    
Router.post('/update',function(req,res){
    const {userid} = req.cookies
    if(!userid){
        return json.dumps({code:1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        const data = Object.assign({},{
            user:doc.user,
            type:doc.type
        },body)
        return res.json({code:0,data})
    })
    
})


Router.get('/getmsglist',function(req,res){
    const user = req.cookies.userid
    User.find({},function(e,userdoc){
        //转成对象形式返回
        let users = {}
        userdoc.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
    //{'$or':[{from:user,to:user}]}
    
})

    

module.exports = Router;
