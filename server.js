let express = require('express');
let app = express();

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

app.get('/', indexRouter);
app.get('/users', usersRouter);

app.listen(3000)
console.log('listening to port 3000');