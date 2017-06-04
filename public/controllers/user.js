var db = require(__dirname + '/../lib/mysql');

exports.login =  function(req, res, next) {
	db.query("SELECT farm_id, user_type, password FROM USER WHERE farm_id = ? AND username = ?", [req.params.farm_id, req.params.username], function(err,rows) {
		if(err) return (err);
		res.status(200).send(rows);
	})
}


exports.findOne =  function(req, res, next) {
	db.query("SELECT username, password FROM USER WHERE farm_id = ? AND username = ?", [req.params.farm_id, req.params.username], function(err,rows) {
		if(err) return (err);
		res.status(200).send(rows);
	})
}

exports.findOneName = function(req, res, next) {
	db.query("SELECT username FROM USER WHERE farm_id = ? AND username = ?", [req.params.farm_id, req.params.username], function(err, rows){
		if(err) return (err);
		res.status(200).send(rows);
	})
}

exports.findUsers = function(req, res, next){
	db.query("SELECT username FROM USER WHERE farm_id = ?", [req.params.farm_id], function(err, rows){
		if(err) return (err);
		res.status(200).send(rows);
	})
}

//transaction
exports.findId = function(req, res, next){
	db.query("SELECT user_id FROM USER WHERE farm_id=? AND username=?", [req.params.farm_id, req.params.username], function(err, rows){
		if(err) return (err);
		res.status(200).send(rows);
	})
}

// I N S E R T
exports.signup = function(req, res, next) {
	db.query("INSERT INTO USER (farm_id, user_type, username, password) VALUES (?, ?, ?, ?)",
		[req.body.farm_id, req.body.user_type, req.body.username, req.body.password],
		function(err, rows){
			if (err) return next(err);
			var newUser = {
				farm_id: req.body.farm_id,
				user_type: req.body.user_type,
				username: req.body.username,
				password: req.body.password
			};
			res.status(200).send({status:'success', data: newUser});
		})
}
