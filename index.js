var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public'));

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//database
app.use(require(__dirname + '/public/config/router')(express.Router()));

app.listen(port, function() {
	console.log('Our app is running on http://localhost:' + port);
})

// app.use(express.static('public'));
// var server = app.listen(8000, function(){
//     var port = server.address().port;
//     console.log('App is running at port %s', port);
// });
