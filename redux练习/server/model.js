const mongoose = require('mongoose')
//Mongoose是在node.js环境下对mongodb进行便捷操作的对象模型工具
//通过mongoose操作mongoDB,存储的是JSON,相对于mysql表的概念要容易
//链接mongo
//首先启动mongoDB服务 mongoDB/BIN文件夹下 输入net start MongoDB        mongo命令进入服务

//注意 ： 要单独开一个CMD  启动node server.js   再回到根目录 npm start 否则页面无法proxy（package.json里配置的proxy）进来9093 的服务器


//链接mongoDB 并使用immoc-chat这个集合
const DB_URL='mongodb://127.0.0.1/27017/imooc-chat'

mongoose.connect(DB_URL)

const models = {
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        'type':{'type':String,'require':true},
        //头像
        'avatar':{'type':String},
        //个人描述
        'desc':{'type':String},
        //职位名
        'title':{'type':String},

        //如果你是boss 还有公司和 薪资字段
        'company':{'type':String},
        'money':{'type':String}
    },
    chat:{
        'chatid':{'type':String,'require':true},
        'from':{'type':String,'require':true},
        'to':{'type':String,'require':true},
        'content':{'type':String,'require':true,'default':''},
        'create_time':{'type':Number,'default':new Date().getTime()},
        'read':{'type':Boolean,'default':false}
    }
}

//循环建立models下所有的表建立模型
//Schema是一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力。
//schema可以理解为mongoose对表结构的定义(不仅仅可以定义文档的结构和属性，还可以定义文档的实例方法、静态模型方法、复合索引等)，每个schema会映射到mongodb中的一个collection，schema不具备操作数据库的能力
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}

//getModel方法读取模型
module.exports = {
    getModel:function(name){
        return mongoose.model(name)
    }
}
