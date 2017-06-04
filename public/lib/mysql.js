var mysql = require('mysql');
module.exports = mysql.createConnection({
	host: 'localhost',
	user: 'farmaide',
	password: 'farmaide',
	database: 'FarmAide'
});
