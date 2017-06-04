var db = require(__dirname + '/../lib/mysql');

exports.findAll = function(req, res, next){
    db.query("SELECT milk_yield, days, fats_yield, protein_yield, total_solids_yield FROM MILK_YIELD WHERE farm_id=? AND cow_id=?",
        [req.params.farm_id, req.params.cow_id], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.findAllwithTime = function(req, res, next){
    db.query("SELECT time_stamp, milk_yield, days, fats_yield, protein_yield, total_solids_yield FROM MILK_YIELD WHERE farm_id=? AND cow_id=?",
        [req.params.farm_id, req.params.cow_id], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

//MilkYieldDetailActivity
exports.findOne = function(req, res, next){
    db.query("SELECT milk_yield, days, fats_yield, protein_yield, total_solids_yield FROM MILK_YIELD WHERE farm_id=? AND cow_id=? AND time_stamp=?",
        [req.params.farm_id, req.params.cow_id, req.params.time_stamp], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.insert = function(req, res, next) {
	db.query("INSERT INTO MILK_YIELD (cow_id, farm_id, milk_yield, days, fats_yield, protein_yield, total_solids_yield, time_stamp) VALUES (?,?,?,?,?,?,?,?)",
		[req.body.cow_id, req.body.farm_id, req.body.milk_yield, req.body.days, req.body.fats_yield, req.body.protein_yield, req.body.total_solids_yield, req.body.time_stamp],
		function(err, rows){
			if (err) return next(err);
			var newMilkYield = {
				cow_id: req.body.cow_id,
                farm_id: req.body.farm_id,
                milk_yield: req.body.milk_yield,
                days: req.body.days,
                fats_yield: req.body.fats_yield,
                protein_yield: req.body.protein_yield,
                total_solids_yield: req.body.total_solids_yield,
                time_stamp: req.body.time_stamp
			};
			res.status(200).send({status:'success', data: newMilkYield});
		})
}
