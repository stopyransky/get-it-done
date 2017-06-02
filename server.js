var express = require('express');
	//MongoClient = require('mongodb').MongoClient;

var app = express();

const PORT = process.env.PORT || 3000;

app.use( function( req, res, next ) {
	if( req.headers['x-forwarded-proto'] === "https") {
		res.redirect("http://" + req.hostname + req.url );
	} else {
		next();
		
	}
});
// var allowCrossDomain = function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', "*");
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// }

// // app.configure(function() {
//     app.use(allowCrossDomain);
//     //some other code
// // });  
app.use( express.static('public') );


// MongoClient.connect("mongodb://localhost:27017/scratch", function onConnect( err, db ) {

// } );


var server = app.listen( PORT, function() {
	// var port = server.address().port;
    console.log("Listening on port %s.", PORT);
} );
