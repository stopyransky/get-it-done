function getWeather( location ) {
	return new Promise( function(resolve, reject ) {
		resolve(97);
		reject("city not found");
	});
}

getWeather("wroclaw").then( function success( temp ) {
	console.log("promise success: " , temp);
}, function err(){
	console.log("promise error", err);
})


function add( a, b ) {

	var result = a + b;
	return new Promise( function ( resolve, reject ) {
		if( typeof result === 'number') resolve(result);
		else reject(result);
	});
}

add(1,2).then( function( result ) {
	console.log("result: ", result );
}, function( error ) {
	console.log("not a number", error );
});

add("dude",2).then( function( result ) {
	console.log("result: ", result );
}, function( error ) {
	console.log("not a number", error );
});
