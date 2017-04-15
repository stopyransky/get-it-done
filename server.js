var express = require('express'),
	MongoClient = require('mongodb').MongoClient;

var app = express();

app.use( express.static('public') );


MongoClient.connect("mongodb://localhost:27017/scratch", function onConnect( err, db ) {

} );


var server = app.listen( 3000, function() {
	var port = server.address().port;
    console.log("Listening on port %s.", port);
} );
