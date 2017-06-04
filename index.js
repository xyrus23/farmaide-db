var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static('public'));
var server = app.listen(8000, function(){
    var port = server.address().port;
    console.log('App is running at port %s', port);
});

//database
app.use(require(__dirname + '/public/config/router')(express.Router()));
