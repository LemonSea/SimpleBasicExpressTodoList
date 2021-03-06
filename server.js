let express = require('express');
let bodyParser = require('body-parser');
let fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

let app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var createFolder = function (folder) {
    try {
        fs.accessSync(folder);
    } catch {
        fs.mkdirSync(folder);
    }
}
var uploadFolder = './upload/';
createFolder(uploadFolder)

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })


// POST /api/users gets JSON bodies
app.post('/upload', upload.single('logo'), function (req, res) {
    console.dir(req.file),
        res.send({ 'ret_code': 0 });
})

// POST /login gets urlencoded bodies
app.post('/', urlencodedParser, function (req, res) {
    console.dir(req.body);
    res.send(req.body);
})

app.get('/form/:name', function (req, res) {
    // 自定义要传入 HTML 的变量
    let data = { "id": "001", "name": "lemon" }
    // 把 person 传入 form.ejx 页面
    res.render('form', { data: data })
})
// app.get('/form', function (req, res) {
//     res.sendfile(__dirname + '/form.html');
//     // 等同于：
//     // res.sendfile('./form.html');    
// })

app.listen(3000)
console.log('listening to port 3000');