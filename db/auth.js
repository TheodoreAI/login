const db = require('../dbconfig.js');





const userLogin = (username, password) =>{
	return db.query(`
		SELECT * FROM users WHERE username=$1 AND password=$2`, [username, password]).then((userInfo) =>{
			return userInfo;
		}).catch(function(error){
			console.log("There was an error making the query to the users table", error.message);
		})
}



const userRegister = (firstName, lastName, email, username, password) =>{
	console.log(typeof password);
	return db.query(
		`
		INSERT INTO users (firstname, lastname, email, username, password)
		VALUES($1, $2, $3, $4, $5)
		`, [firstName, lastName, email, username, password]).then((registered)=>{
			return registered;
		}).catch(function(error){
			console.log('Error making the query to register a user', error.message);
		})
}


module.exports = {
	userLogin,
	userRegister
}