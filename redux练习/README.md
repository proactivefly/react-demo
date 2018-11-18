### 项目启动
1，npm install后 先在server的文件夹 启动 nodemon server.js

2.根目录 启动 npm start



### build 打包的一些说明

1.要改写 server.js 处理路径 `server/server.js`
```
const path = require('path')

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
```

2.改写package.json 可以在项目根目录用npm run server启动服务
```
 "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js --env=jsdom",
    "server": "nodemon server/server.js"
  },
```

3.停止server的9093端口  直接在根目录3000端口下运行 npm run server就可以启动了
 改下路径到 http://localhost:9093/login




### shouldComponentUpdate 

因为组件的render是每次都执行的  所以用这个来判断是不是要render此组件
```
 shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }

```
