var db = require(__dirname + '/../lib/mysql');

exports.findAll = function(req, res, next){
    db.query("SELECT cow_name, cow_id FROM COW WHERE farm_id=?", [req.params.farm_id],function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.findOne = function(req, res, next){
    db.query("SELECT cow_name FROM COW WHERE farm_id=? AND cow_name=?", [req.params.farm_id, req.params.cow_name], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.findOneId = function(req, res, next){
    db.query("SELECT cow_id FROM COW WHERE farm_id = ? AND cow_name = ?", [req.params.farm_id, req.params.cow_name], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.insert = function(req, res, next){
    db.query("INSERT INTO COW (farm_id, cow_name) VALUE (?, ?)",
        [req.body.farm_id, req.body.cow_name], function(err, rows){
            if (err) return next(err);
            var newCow = {
                farm_id: req.body.farm_id,
                cow_name: req.body.cow_name
            };
            res.status(200).send({status:'success', data: newCow});
        })
}
