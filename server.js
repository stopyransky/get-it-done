const express = require('express');
const helmet = require('helmet')
const app = express();

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'development';

app.use(helmet())
if(ENV === 'production') {

	app.use( function( req, res, next ) {
		if( req.headers['x-forwarded-proto'] === "https") {
			res.redirect("http://" + req.hostname + req.url );
		} else {
			next();
		}
	});
	
	app.use( express.static('public') );

} else {
	require('./serverDev')(app)
}


app.listen( PORT, function() {
	console.log(`Listening on port ${PORT}, in ${ENV} environment.`);
} );


