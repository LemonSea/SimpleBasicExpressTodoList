# SimpleBasicExpressTodoList 项目简介
---
这是一个使用 Express 实现的简单 Node.js 项目，是我学习 Express 的第一个代码，用来了解 Express 的使用。

本项目使用云端数据库，专注于 Node.js 的 Express 的后端逻辑。

# 实例：TodoList

## 需要的依赖：

- Express
- EJS
- body-parser

## app.js（启动文件）

这一次，我们使用 app.js 为启动文件，给它写入基础内容：

```js
let express =  require('express');

let app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));

app.listen('3000');

console.log('you are listen to port 3000');
```

## controller(todoListContorller.js 路由控制文件)

这一次，我们把路由写在 controller 文件夹下的 todoListcontroller.js 文件下，主要包括获取 list 的 get 方法，新增 list 的 create 方法，删除 list 的 delete 方法：

```js
module.exports = function (app) {
    // get
    app.get('/todo', function (req, res) {

    });
    // create
    app.post('/todo', function (req, res) {

    })
    // delete
    app.delete('/todo', function (req, res) {

    })
}
```

在 app.js 中导入：

```js
let todoListController = require('./controllers/todoListController');
```

然后使用，把 app.js 中的 app 传入 todoListContorllor.js 中：

```js
todoListController(app);
```

【注意】

我们这里的分层逻辑是，请求相关的放在 controller，数据库相关的放到 model 中，视图相关是 view。即 MVC。