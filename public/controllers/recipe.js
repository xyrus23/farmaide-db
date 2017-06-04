var db = require(__dirname + '/../lib/mysql');

exports.findAll = function(req, res, next){
    db.query("SELECT recipe_name, animal, animal_type, dm_req, cp_req, me_req, ca_req, p_req, animal_weight FROM RECIPE WHERE farm_id = ?",
        [req.params.farm_id], function(err, rows){
            if(err) return (err);
            res.status(200).send(rows);
        })
}

exports.findOne = function(req, res, next){
    db.query("SELECT recipe_id, recipe_name FROM RECIPE WHERE farm_id=? AND recipe_name=? AND animal=? AND animal_type=?",
    [req.params.farm_id, req.params.recipe_name, req.params.animal,req.params.animal_type], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.deleteOne = function(req, res, next){
    db.query("DELETE FROM RECIPE WHERE recipe_id = ?", [req.body.recipe_id], function(err, rows){
        if(err) return (err);
        var deletedRecipe = {
            recipe_id: req.body.recipe_id
        };
        res.status(200).send({status:'sucess', data:deletedRecipe});
    })
}

//EditRecipeActivity
exports.findId = function(req, res, next){
    db.query("SELECT recipe_id FROM RECIPE WHERE farm_id=? AND recipe_name=? AND animal=? AND animal_type=?",
    [req.params.farm_id, req.params.recipe_name, req.params.animal, req.params.animal_type], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.editRecipe = function(req, res, next){
    db.query("UPDATE RECIPE SET recipe_name=?, animal=?, animal_type=?, dm_req=?, cp_req=?, me_req=?, ca_req=?, p_req=?, animal_weight=? WHERE recipe_id=?",
    [req.body.recipe_name, req.body.animal, req.body.animal_type, req.body.dm_req, req.body.cp_req, req.body.me_req, req.body.ca_req, req.body.p_req, req.body.animal_weight, req.body.recipe_id], function(err, rows){
        if(err) return (err);
        var updatedRecipe = {
            recipe_name: req.body.recipe_name,
            animal: req.body.animal,
            animal_type: req.body.animal_type,
            dm_req: req.body.dm_req,
            cp_req: req.body.cp_req,
            me_req: req.body.me_req,
            ca_req: req.body.ca_req,
            p_req: req.body.p_req,
            animal_weight: req.body.animal_weight,
            recipe_id: req.body.recipe_id
        };
        res.status(200).send({status:'success', data:updatedRecipe});
    })
}

//AddRecipeActivity
exports.findName = function(req, res, next){
    db.query("SELECT recipe_name FROM RECIPE WHERE farm_id=? AND recipe_name=?", [req.params.farm_id, req.params.recipe_name], function(err, rows){
        if(err) return (err);
        res.status(200).send(rows);
    })
}

exports.insert = function(req, res, next){
    db.query("INSERT INTO RECIPE (farm_id, recipe_name, animal, animal_type, dm_req, cp_req, me_req, ca_req, p_req, animal_weight) VALUES (?,?,?,?,?,?,?,?,?,?)",
		[req.body.farm_id, req.body.recipe_name, req.body.animal, req.body.animal_type, req.body.dm_req, req.body.cp_req, req.body.me_req, req.body.ca_req, req.body.p_req, req.body.animal_weight],
		function(err, rows){
			if (err) return next(err);
			var newRecipe = {
                farm_id: req.body.farm_id,
                recipe_name: req.body.recipe_name,
                animal: req.body.animal,
                animal_type: req.body.animal_type,
                dm_req: req.body.dm_req,
                cp_req: req.body.cp_req,
                me_req: req.body.me_req,
                ca_req: req.body.ca_req,
                p_req: req.body.p_req,
                animal_weight: req.body.animal_weight,
			};
			res.status(200).send({status:'success', data: newRecipe});
		})
}
