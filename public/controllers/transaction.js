var db = require(__dirname + '/../lib/mysql');

exports.findAll = function(req, res, next){
    db.query("SELECT time_stamp, note FROM TRANSACTIONS WHERE user_id=? AND farm_id=?", [req.params.user_id, req.params.farm_id], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.insert = function(req, res, next){
    db.query("INSERT INTO TRANSACTIONS (user_id, farm_id, time_stamp, note) VALUES (?, ?, ?, ?)",
		[req.body.user_id, req.body.farm_id, req.body.time_stamp, req.body.note],
		function(err, rows){
			if (err) return next(err);
			var newTransaction = {
				user_id: req.body.user_id,
				farm_id: req.body.farm_id,
				time_stamp: req.body.time_stamp,
                note: req.body.note
			};
			res.status(200).send({status:'success', data: newTransaction});
		})
}
