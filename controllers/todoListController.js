let bodyParser = require('body-parser');
let urlencodeparser = bodyParser.urlencoded({ extended: "false" });

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://lemon:1434870859@nodelistdb-xgiqa.mongodb.net/test?retryWrites=true&w=majority');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    var todoSchema = mongoose.Schema({
        item: String
    });
    var Todo = mongoose.model('Todo', todoSchema);
    var todoItem = new Todo({ item: 'Todo' });
    todoItem.save(function (err, todoItem) {
        if (err) return console.error(err);
        console.log("Save success!")
    });
});


let data = [{ "item": "get milk" }, { "item": "dog" }, { "item": "cat" }]


module.exports = function (app) {
    // get
    app.get('/todo', function (req, res) {
        res.render('todo', { todos: data })
    });
    // create
    app.post('/todo', urlencodeparser, function (req, res) {
        data.push(req.body);
        res.json(data);
    })
    // delete
    app.delete('/todo/:item', function (req, res) {
        data = data.filter((todo) => {
            return todo.item.replace(/ /g, "-") !== req.params.item;
        });
        res.json(data);
    })
}