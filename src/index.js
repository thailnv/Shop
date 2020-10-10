const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, '/public')));

//template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
app.get('/', (req, res) => res.render('home'));
app.get('/news', (req, res)=> res.render('newspage'));

app.listen(port, () => console.log(`Example app listen at port ${port}`) );
