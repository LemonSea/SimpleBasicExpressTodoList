# SimpleBasicExpressTodoList 项目简介
---
这是一个使用 Express 实现的简单 Node.js 项目，是我学习 Express 的第一个代码，用来了解 Express 的使用。

本项目使用云端数据库，专注于 Node.js 的 Express 的后端逻辑。

# 中间件

## 简述：

```javascript
let express = require('express');
let app = express();

app.use(function(req, res, next) {
    console.log("first middleware");
    next();
})

app.get('/', function(req, res) {
    console.log("second middleware")
    res.send('ok');
})

app.listen(3000)
console.log('listening to port 3000');
```

上面的写法中，use 就是使用中间件的意思，get 的函数本质也是一个中间件的函数，它应该有三个参数：req、res、next。get 的中间件一般是最后一个，处理完 get 的函数后就结束了，没有传递给下一个中间件。而我们通过 use  使用的中间件，在结束后调用了 next() 方法以传递给下一个中间件执行。

不调用 next  就不会传递下一个中间件，即在当前结束，不会去到 get，也就不会打印 `second middleware` 以及响应 `ok`。

## 响应顺序

```javascript
app.use(function(req, res, next) {
    console.log("first middleware end");
    next();
    console.log("first middleware end");
})

app.use(function(req, res, next) {
    console.log("secound middleware");
    res.send('ok');
})
```

上面的输出顺序，就是先 first start，然后 second，再 first end。（没错，想到了 generator ）。

且 use 的第一个参数可以是一个路径名：

```javascript
app.use(function (req, res, next) {
    console.log("first middleware end");
    next();
    console.log("first middleware end");
})

app.use('/home', function (req, res, next) {
    console.log("secound middleware");
    res.send('ok');
})
```

按照如上改造一下，那么 `http://localhost:3000/` 也就不会进入第二个中间件，直接 first start 后 first end 结束，没有 second 了。

通过 `http://localhost:3000/home` 才会进入第二个中间件，执行： first start，second，first end。

## Express 默认中间件：静态文件访问

Express 有一个响应静态文件的默认中间件，[文档](http://www.expressjs.com.cn/starter/static-files.html)

```javascript
app.use(express.static('public'))
```

这里指定了 public 目录，只要将静态文件放进这个目录，我们就可以通过静态文件名称（带格式）来进行访问，eg：`http://localhost:3000/header.jpg`。

可以嵌套访问：`http://localhost:3000/assets/header.jpg`。

也可以设置路由：

```javascript
app.use('/img', express.static('public'))
```

这就是在文件名前面加上 img 才能访问：`http://localhost:3000/img/header.jpg`。

