var express = require('express');
	//MongoClient = require('mongodb').MongoClient;

var app = express();

const PORT = process.env.PORT || 3000;

app.use( function( req, res, next ) {
	if( req.headers['x-forwarded-proto'] === "http") {
		next();
	} else {
		res.redirect("http://" + req.hostname + req.url );
	}
});

app.use( express.static('public') );


// MongoClient.connect("mongodb://localhost:27017/scratch", function onConnect( err, db ) {

// } );


var server = app.listen( PORT, function() {
	// var port = server.address().port;
    console.log("Listening on port %s.", PORT);
} );
