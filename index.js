var express = require('express'),
	MongoClient = require('mongodb').MongoClient;

var app = express();

app.use( express.static('public') );


MongoClient.connect("mongodb://localhost:27017/scratch", function onConnect( err, db ) {

} );


app.listen( 3000, function() {
    console.log("Listening on port 3000.");
} );
