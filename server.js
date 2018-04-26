var express = require('express');

var app = express();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || 'development';

app.use( function( req, res, next ) {
	if( req.headers['x-forwarded-proto'] === "https") {
		res.redirect("http://" + req.hostname + req.url );
	} else {
		next();
	}
});

app.use( express.static('public') );

var server = app.listen( PORT, function() {
    console.log(`Listening on port ${PORT}, in ${ENV} environment.`);
} );