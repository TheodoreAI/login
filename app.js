const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const localhost = "127.0.0.1";
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');

const expressSession = require('express-session')({
	secret:'secret',
	resave: false,
	saveUninitialized: false
});


// This is the db pages that I need to make the requests to the server:
const auth = require('./db/auth.js');



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

// using the express session middleware
app.use(expressSession);

// using the passport middleware sessions
app.use(passport.initialize());
app.use(passport.session());



// accessing the css and js scripts
app.use('/', express.static(path.join(__dirname, '/public')));
app.use('/register/', express.static(path.join(__dirname, '/public')));
app.use('/login/', express.static(path.join(__dirname, '/public')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));







app.post('/loginUser', function(req, res){
	console.log(req.body);
	const username = req.body.userName;
	const password = req.body.passWord; 

	auth.userLogin(username, password)
	.then((userInfo)=>{
		
		console.log(userInfo);
		res.render('profile.hbs', {userInfo});


	}).catch(function(error){
		console.log("Error on the server while making the profile.hbs response", error.message);
	})

})


app.post('/registerUser', function(req, res){

	
	const firstName = req.body.firstName;
	const lastName = req.body.lastName;
	const email = req.body.email;
	const username = req.body.userName;
	const passWord = req.body.passWord;

	bcrypt.hash(passWord, saltRounds).then((hash)=>{
		console.log(req.body, typeof hash, "This is the info passed to the server")

		auth.userRegister(firstName, lastName, email, username, hash)
		.then((registered)=>{
			res.render('login.hbs')
		})


	})
})










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