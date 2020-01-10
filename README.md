# SimpleBasicExpressTodoList 项目简介
---
这是一个使用 Express 实现的简单 Node.js 项目，是我学习 Express 的第一个代码，用来了解 Express 的使用。

本项目使用云端数据库，专注于 Node.js 的 Express 的后端逻辑。

# 路由

我们之前的路由写在一个页面，不利于维护，使用 Express  的 Router 对路由进行重构，[文档](http://www.expressjs.com.cn/guide/routing.html) 末尾有 Router 方法的介绍：

先新建路由文件夹，里面放上对各个页面路由的处理，如 index.js 正对根路由  何 users.js 正对 users 页面的路由：

index.js 的内容：

```javascript
var express = require('express')
var router = express.Router()

router.get('/', function (req, res, next) {
    res.send('root');
})

module.exports = router
```

users.js 的内容：

```js
var express = require('express')
var router = express.Router()

router.get('/users', function (req, res, next) {
    res.send('users');
})

module.exports = router
```

上面我们导入了 express.Router 模块，创建了对应的路由处理后，再导出，在 server.js 文件中使用它：

```js
let express = require('express');
let app = express();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.get('/', indexRouter);
app.get('/users', usersRouter);

app.listen(3000)
console.log('listening to port 3000');
```

可以看到，先在的 server.js 页面就很规范，业务的处理代码都去了对应页面中，不同的路由在不同的文件，方便维护也方便开发。