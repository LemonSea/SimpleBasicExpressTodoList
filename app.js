let express =  require('express');
let todoListController = require('./controllers/todoListController');

let app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));

todoListController(app);

app.listen('3000');

console.log('you are listen to port 3000');