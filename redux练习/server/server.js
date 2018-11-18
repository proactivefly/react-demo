const express = require('express')

const bodyParser = require('body-parser')
/**
 * cookieParser cookie 插件
 * @type {[type]}
 */
const cookieParser = require('cookie-parser')




const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server)

const model = require('./model.js')
const Chat = model.getModel('chat')

const path = require('path')

// on  是 监听 参数socket是当前这次链接的请求 Io是全局请求
io.on('connection',function(socket){
    console.log('user login')
    socket.on('sendmsg',function(data){
        // console.log(data)
        // io.emit('recvmsg',data)  //再次把请求放到全局中
        
        const {from,to,msg} = data
        //chatid 就是把from的ID 和 to的ID 结合排序返回一个新的唯一的代表俩人聊天的ID
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            //接受到每条信息  广播出
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})


//引入user.js
const userRouter = require('./user.js')


app.use(cookieParser())
app.use(bodyParser.json())


//一级目录是user 下面的东西在userRouer里配置
app.use('/user',userRouter)

//打包后设置中间件 next 代表下一个中间件  path.resolve就是把相对路径变成绝对路径 ，确保不会报错
app.use(function(req,res,next){
    //设置白名单
    if(req.url.startsWith('/user/') || req.url.startsWith('/static/')){
        return next()
    }
    //只要不是user或者 static开头的路径 就访问build/index.hml
    return res.sendFile(path.resolve('build/index.html'))
})

//打包build后 使express不拦截build文件夹
app.use('/',express.static(path.resolve('build')))


//监听端口 原来是app.listen  写成server.listen socket.io就和express结合起来了
server.listen(9420,function(){
    console.log('node server start at port 9420')
})


// mongoose.connection.on('connected',function(){
//     console.log('mongo connect success')
// })
//类似于mysql的表，mongo里有文档，字段的概念
// model是新建一个模型 下面定义一个user文档 Schema是一些配置
// const User = mongoose.model('user',new mongoose.Schema({
//         user:{type:String,require:true},
//         age:{type:Number,require:true}
// }))
//新增数据  第一个参数是插入的值，第二个是回调  NODE的回调都是2个参数 err:错误  doc返回结果
//点了ctrl+s 保存后直接插入数据库
// User.create({
//     user:'immoc3',
//     age:14
// },function(err,doc){
//     if(!err){
//         console.log(doc)
//     }
//     else{
//         console.log(err)
//     }
// })
//删除 将所有age 是18的删除
// User.remove({age:18},function(err,doc){
//      if(!err){
//         console.log(doc)
//     }
// })

// User.remove({age:14},function(err,doc){
//      if(!err){
//         console.log(doc)
//     }
// })
// User.update({'user':'immoc3'},{'$set':{age:11}},function(err,doc){
//     if(!err){
//         console.log(doc)
//     }
// })



//进入根目录 req是发送的请求，res是返回结果
// app.get('/',function(req,res){  
//   res.send('<h1>hello world!!!!</h1>')
// })

// app.get('/data',function(req,res){
//     //上边create了一条数据，现在我们来查找  find 是查找结果是数组  findone可以只查找一条
//     // 如果第一个参数传入{}   则查找所有数据
//       User.findOne({age:11},function(err,doc){
//          res.json(doc)
//       })
//     // res.json({
//     //     name:'weibin123',
//     //     age:18
//     // })
// })




/*控制台进入到 server目录下 执行 node server.js  然后打开localhost:9093 会看到hello world*/
/*localhost:9093/data   会看到JSON数据*/

/*安装 npm install -g nodemon  通过nodemon server.js就不用改变后每次ctrl + C重启服务了*/
