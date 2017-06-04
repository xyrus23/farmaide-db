var farm = require('./../controllers/farm');
var user = require('./../controllers/user');
var feed = require('./../controllers/feed');
var recipe = require('./../controllers/recipe');
var cow = require('./../controllers/cow');
var milk_yield = require('./../controllers/milk_yield');
var transaction = require('./../controllers/transaction');

module.exports = function(router){

    //FARM
    router.route('/api-user/farms')
        .post(farm.signup)
        .get(farm.findAll);
    router.route('/api-user/farms/:farm_name')
        .get(farm.findOneName);
    router.route('/api-user/farm/:farm_name')
        .get(farm.findOneId);
    router.route('/api-user/findFarm/:farm_id')
        .get(farm.findOne);
    router.route('/api-user/suppliers/:farm_id')
        .get(farm.findSupplier);

    //USER
    router.route('/api-user/login/:farm_id/:username')
        .get(user.login);
    router.route('/api-user/signup')
        .post(user.signup);
    router.route('/api-user/user/:farm_id/:username')
        .get(user.findOne);
    router.route('/api-user/users/:farm_id/:username')
        .get(user.findOneName);
    router.route('/api-user/users/:farm_id')
        .get(user.findUsers);
    router.route('/api-user/user_id/:farm_id/:username')
        .get(user.findId);

    //FEED
    router.route('/api-user/feed_types/:farm_id')
        .get(feed.findType);
    router.route('/api-user/feeds/:farm_id/:feed_type')
        .get(feed.findFeeds);
    router.route('/api-user/supplierFeed/:farm_id')
        .get(feed.findSupplierFeed);
    router.route('/api-user/feed')
        .post(feed.insert)
        .put(feed.editFeed);
    router.route('/api-user/feed/:farm_id/:feed_name')
        .get(feed.findOne);
    router.route('/api-user/feed/supply')
        .put(feed.updateSupply);
    router.route('/api-user/feed/supply/:farm_id/:feed_name')
        .get(feed.findSupply);
    router.route('/api-user/feed/edit/:farm_id/:feed_name')
        .get(feed.findOneEdit);
    router.route('/api-user/feed/edit/id/:farm_id/:feed_name')
        .get(feed.findIdEdit);
    router.route('/api-user/feed/optimizer/:farm_id/:feed_type')
        .get(feed.findFeedperType);
    router.route('/api-user/feed/optimizer/value/:farm_id/:feed_name')
        .get(feed.findFeedValues);
    router.route('/api-user/feed/solution/:farm_id/:feed_name')
        .get(feed.findFeedsSupply);

    //RECIPE
    router.route('/api-user/recipe/:farm_id')
        .get(recipe.findAll);
    router.route('/api-user/recipe/:farm_id/:recipe_name/:animal/:animal_type')
        .get(recipe.findOne);
    router.route('/api-user/recipe/:farm_id/:recipe_name')
        .get(recipe.findName);
    router.route('/api-user/recipe')
        .post(recipe.insert)
        .put(recipe.editRecipe)
        .delete(recipe.deleteOne);
    router.route('/api-user/recipe_id/:farm_id/:recipe_name/:animal/:animal_type')
        .get(recipe.findId);

    //COW
    router.route('/api-user/cow/:farm_id')
        .get(cow.findAll);
    router.route('/api-user/cow/:farm_id/:cow_name')
        .get(cow.findOne);
    router.route('/api-user/cow_id/:farm_id/:cow_name')
        .get(cow.findOneId);
    router.route('/api-user/cow')
        .post(cow.insert);


    //MILK_YIELD
    router.route('/api-user/milk_yield/:farm_id/:cow_id')
        .get(milk_yield.findAll);
    router.route('/api-user/milk_yield/time_stamp/:farm_id/:cow_id')
        .get(milk_yield.findAllwithTime);
    router.route('/api-user/milk_yield/:farm_id/:cow_id/:time_stamp')
        .get(milk_yield.findOne);
    router.route('/api-user/milk_yield')
        .post(milk_yield.insert);

    //TRANSACTION
    router.route('/api-user/transaction')
        .post(transaction.insert);     
    router.route('/api-user/transaction/:user_id/:farm_id')
        .get(transaction.findAll);

    return router;
};
