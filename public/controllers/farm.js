var db = require(__dirname + '/../lib/mysql');

exports.findAll =  function(req, res, next) {
	db.query("SELECT farm_name FROM FARM", function(err,rows) {
		if(err) return (err);
		res.status(200).send(rows);
	})
}


exports.findOneName =  function(req, res, next) {
	db.query("SELECT farm_name FROM FARM WHERE farm_name = ?", [req.params.farm_name], function(err,rows) {
		if(err) return (err);
		res.status(200).send(rows);
	})
}

exports.findOneId =  function(req, res, next) {
	db.query("SELECT farm_id FROM FARM WHERE farm_name = ?", [req.params.farm_name], function(err,rows) {
		if(err) return (err);
		res.status(200).send(rows);
	})
}

exports.findOne =  function(req, res, next) {
	db.query("SELECT farm_name, password FROM FARM WHERE farm_id=?", [req.params.farm_id], function(err, rows){
		if(err) return (err);
		res.status(200).send(rows);
	})
}

exports.findSupplier = function(req, res, next) {
	db.query("SELECT farm_id, farm_name, contact_no FROM FARM WHERE farm_id != ?",
		[req.params.farm_id], function(err, rows){
			if(err) return (err);
			res.status(200).send(rows);
		})
}

//S I G N - U P
exports.signup = function(req, res, next) {
	db.query("INSERT INTO FARM (farm_name, password, contact_no) VALUES (?, ?, ?)",
		[req.body.farm_name, req.body.password, req.body.contact_no],
		function(err, rows){
			if (err) return next(err);
			var newFarm = {
				farm_name: req.body.farm_name,
				password: req.body.password,
				contact_no: req.body.contact_no
			};
			res.status(200).send({status:'success', data: newFarm});
		})
}
