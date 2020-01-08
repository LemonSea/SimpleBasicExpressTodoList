let express = require('express');
var bodyParser = require('body-parser');

let app = express();

// parse application/json
app.use(bodyParser.json())

app.get('/profile/:id/:name', function (req, res) {
    let responseData = ( "you requset is " + req.params.name );
    res.status(200).send(responseData);
});

app.get('/', function (req, res) {
    console.dir(req.query)
    res.send("home page " + JSON.stringify(req.query));
});

app.get('/', function (req, res) {
    console.dir(req.query)
    res.send("home page " + JSON.stringify(req.query));
});

app.post('/', function (req, res) {
    console.dir(req.body);
    res.send(req.body);
})

app.listen(3000)
console.log('listening to port 3000');