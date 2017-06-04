var db = require(__dirname + '/../lib/mysql');

exports.findType = function(req, res, next){
    db.query("SELECT feed_type FROM FEED WHERE farm_id = ? ORDER BY feed_type ASC", [req.params.farm_id], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.findFeeds = function(req, res, next){
    db.query("SELECT feed_name FROM FEED WHERE farm_id = ? AND feed_type = ? ORDER BY feed_name ASC", [req.params.farm_id, req.params.feed_type], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.findSupplierFeed = function(req, res, next){
    db.query("SELECT feed_name, supply_amount FROM FEED WHERE farm_id = ?", [req.params.farm_id], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

//AdminInventoryDetailActivity
exports.findOne = function(req, res, next){
    db.query("SELECT feed_price, supply_amount, dry_matter, total_digestible_nutrient, crude_protein, met_energy, calcium, phosphorus, pic_ref FROM FEED WHERE farm_id=? AND feed_name=?",
        [req.params.farm_id, req.params.feed_name], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.findSupply = function(req, res, next){
    db.query("SELECT feed_id, supply_amount FROM FEED WHERE farm_id=? AND feed_name=?", [req.params.farm_id, req.params.feed_name], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.updateSupply = function(req, res, next){
    db.query("UPDATE FEED SET supply_amount = ? WHERE feed_id = ?", [req.body.supply_amount, req.body.feed_id], function(err, rows){
        if(err) return (err);
        var updatedSupply = {
            supply_amount: req.body.supply_amount,
            feed_id: req.body.feed_id
        };
        res.status(200).send({status:'success', data: updatedSupply});
    })
}

//EditInventoryActivity
exports.findOneEdit = function(req, res, next){
    db.query("SELECT feed_id, feed_name, dry_matter, total_digestible_nutrient, feed_price, supply_amount, crude_protein, met_energy, calcium, phosphorus, pic_ref FROM FEED WHERE farm_id=? AND feed_name=?",
        [req.params.farm_id, req.params.feed_name], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.findIdEdit = function(req, res, next){
    db.query("SELECT feed_id, feed_name FROM FEED WHERE farm_id=? AND feed_name=?",
        [req.params.farm_id, req.params.feed_name], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.editFeed = function(req, res, next){
    db.query("UPDATE FEED SET feed_type=?, feed_name=?, dry_matter=?, total_digestible_nutrient=?, feed_price=?, supply_amount=?, crude_protein=?, met_energy=?, calcium=?, phosphorus=?, pic_ref=? WHERE feed_id=?",
        [req.body.feed_type, req.body.feed_name, req.body.dry_matter, req.body.total_digestible_nutrient, req.body.feed_price, req.body.supply_amount, req.body.crude_protein, req.body.met_energy, req.body.calcium, req.body.phosphorus, req.body.pic_ref, req.feed_id], function(err, rows){
            if(err) return (err);
            var updatedFeed = {
                feed_type: req.body.feed_type,
                feed_name: req.body.feed_name,
                dry_matter: req.body.dry_matter,
                total_digestible_nutrient: req.body.total_digestible_nutrient,
                feed_price: req.body.feed_price,
                supply_amount: req.body.supply_amount,
                crude_protein: req.body.crude_protein,
                met_energy: req.body.met_energy,
                calcium: req.body.calcium,
                phosphorus: req.body.phosphorus,
                pic_ref: req.body.pic_ref,
                feed_id: req.body.feed_id
            };
            res.status(200).send({status:'success', data: updatedFeed});
        })
}

//AddInventoryActivity
exports.findFeedName = function(req, res, next){
    db.query("SELECT feed_name FROM FEED WHERE farm_id=? AND feed_name=?", [req.params.farm_id, req.params.feed_name], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.insert = function(req, res, next){
    db.query("INSERT INTO FEED (farm_id, feed_type, feed_name, dry_matter, total_digestible_nutrient, feed_price, supply_amount, crude_protein, met_energy, calcium, phosphorus, pic_ref) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
		[req.body.farm_id, req.body.feed_type, req.body.feed_name, req.body.dry_matter, req.body.total_digestible_nutrient, req.body.feed_price, req.body.supply_amount, req.body.crude_protein, req.body.met_energy, req.body.calcium, req.body.phosphorus, req.body.pic_ref],
		function(err, rows){
			if (err) return next(err);
			var newFeed = {
				farm_id: req.body.farm_id,
                feed_type: req.body.feed_type,
                feed_name: req.body.feed_name,
                dry_matter: req.body.dry_matter,
                total_digestible_nutrient: req.body.total_digestible_nutrient,
                feed_price: req.body.feed_price,
                supply_amount: req.body.supply_amount,
                crude_protein: req.body.crude_protein,
                met_energy: req.body.met_energy,
                calcium: req.body.calcium,
                phosphorus: req.body.phosphorus,
                pic_ref: req.body.pic_ref
			};
			res.status(200).send({status:'success', data: newFeed});
		})
}

//OptimizerMenuActivity
exports.findFeedperType = function(req, res, next){
    db.query("SELECT feed_name, supply_amount FROM FEED WHERE farm_id=? AND feed_type=? ORDER BY feed_name ASC",
        [req.params.farm_id, req.params.feed_type], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.findFeedValues = function(req, res, next){
    db.query("SELECT crude_protein, met_energy, calcium, phosphorus, feed_price FROM FEED WHERE farm_id=? AND feed_name=?",
        [req.params.farm_id, req.params.feed_name], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

//OptimizerSolutionActivity
exports.findFeedsSupply = function(req, res, next){
    db.query("SELECT crude_protein, met_energy, calcium, phosphorus, supply_amount FROM FEED WHERE farm_id=? AND feed_name=?",
        [req.params.farm_id, req.params.feed_name], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}
