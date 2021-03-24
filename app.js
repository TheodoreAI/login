const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const localhost = "127.0.0.1";





var bodyParser = require('body-parser');

// start the express app
var app = express();


var hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs'
});

// set the engine and the file extension name and the files that will be used
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use('/static', express.static('public'));
app.use('/', express.static('public'));

// accessing the css and js scripts
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/register/', express.static(path.join(__dirname, '/public')));
app.use('/login/', express.static(path.join(__dirname, '/public')));





app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res) {
    res.render('home', {
        layout: 'main'
    });
});





app.get('/register', function(req, res){
	res.render('register.hbs')
})


app.get('/login', function(req, res){
	res.render('login.hbs')
})






app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something Broke!');
})

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});



app.listen(PORT, () => console.log(`Web App running at http://${localhost}:${PORT}/ Press Ctrl-C to terminate`));


module.exports = app;