DROP TABLE IF EXISTS users;




CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	firstName VARCHAR(255) NOT NULL,
	lastName VARCHAR(255) NOT NULL,
	email VARCHAR(255) UNIQUE NOT NULL,
	username TEXT UNIQUE NOT NULL,
	password VARCHAR(255) NOT NULL
);



INSERT INTO users(firstName, lastName, email, username, password)
VALUES('admin', 'admin', 'admin@theloginapp.com', 'admin1', 'admin123');



