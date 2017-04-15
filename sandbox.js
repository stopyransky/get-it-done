// PROMISES
function promises() {
	

	// function getWeather( location ) {
	// 	return new Promise( function(resolve, reject ) {
	// 		resolve(97);
	// 		reject("city not found");
	// 	});
	// }

	// getWeather("wroclaw").then( function success( temp ) {
	// 	console.log("promise success: " , temp);
	// }, function err(){
	// 	console.log("promise error", err);
	// })


	// function add( a, b ) {

	// 	var result = a + b;
	// 	return new Promise( function ( resolve, reject ) {
	// 		if( typeof result === 'number') resolve(result);
	// 		else reject(result);
	// 	});
	// }

	// add(1,2).then( function( result ) {
	// 	console.log("result: ", result );
	// }, function( error ) {
	// 	console.log("not a number", error );
	// });

	// add("dude",2).then( function( result ) {
	// 	console.log("result: ", result );
	// }, function( error ) {
	// 	console.log("not a number", error );
	// });
	// 
	
	var getTemperature = location => new Promise( (resolve, reject ) => {
		if(Math.random() > 0.5 ) resolve(23); //using resolve callback and providing value 
		else reject("something went wrong"); // using reject callback and sending error
	});

	getTemperature("wroclaw").then( 
		temperature => console.log("the temperature is: ", temperature), // this is passed as resolve function callback
		error => console.log("error: ", error) // this is passed as reject function callback
	);
}

// ARROW FUNCTIONS

function ArrowFunctions() {

	var names = ['Andrew', 'Julie', 'Jen'];

	// nothing new
	names.forEach( function( name ) {
		console.log('foreach: ', name)
	});

	// arrow
	names.forEach(( name ) => {
		console.log('arrowFunc: ', name)
	});

	// even better
	names.forEach((name) => console.log("arrowFunky", name));

	function add( a , b ) {
		return a + b ;
	}

	var addStatement = (a, b ) => {
		// allows multiple lines
		return a + b;
	}

	var addExpression = ( a, b) => a + b;
	console.log( addStatement( 1, 2));
	console.log( addExpression(-2, 2));
}	


(function run() { 
	promises();
	// ArrowFunctions();

})()
