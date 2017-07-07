// var $ = require("jquery");

module.exports = {
	// setTodos : function( todos ) {
	// 	if( $.isArray(todos)) {
	// 		localStorage.setItem('todos', JSON.stringify(todos));
	// 		return todos;
	// 	}
	// },
	//
	// getTodos : function( ) {
	// 	var stringTodos = localStorage.getItem('todos');
	// 	var todos = [];
	//
	// 	try {
	// 		todos = JSON.parse(stringTodos);
	// 	} catch(e) {}
	//
	// 	return $.isArray(todos) ? todos : [];
	//
	// },

	getTags : function(todos, statusFilter)  {
		
		var copy = todos.filter( todo => {
			switch(statusFilter) {
				case "DONE" : return todo.completed;
				case "TODO" : return !todo.completed;
				default: return true;
			}
		}).slice();
		// var copy = todos.slice();
		if(copy) {
			var tagSet= new Set();

			copy.forEach((todo) => todo.tags ? todo.tags.forEach((tag) => tagSet.add(tag)): []);
			return [...tagSet];
		
		} else {
			
			return ["no tags available"];
		
		} 
	},

	filterTodos: function(todos, /*showCompleted,*/ statusFilter, searchText, tagFilter) {
		
		var filteredTodos= todos;
		
		// sort todos with according to create date (newest first) 
		filteredTodos.sort( function( a, b ) {
			if(a.createdAt > b.createdAt) return -1;
			else if( a.createdAt < b.createdAt) return 1
			return 0;  
		});

		//filter by showCompleted
		// filteredTodos = filteredTodos.filter( (todo) =>{
		// 	return !todo.completed || showCompleted;
		// });

		//filter by searchText
		filteredTodos = filteredTodos.filter( (todo) => {
			var text = todo.text.toLowerCase();
			return !searchText || text.indexOf(searchText.toLowerCase()) > -1;
		} );

		// filter by status
		filteredTodos = filteredTodos.filter( (todo) =>{
			switch(statusFilter) {
				case "ALL" : 
					return true;
				case "DONE" : 
					return todo.completed;
				case "TODO" :
					return !todo.completed;
				default : 
					return true;
			}
			// return !todo.completed || showCompleted;
		});

		//filter by tag
		if(tagFilter && tagFilter !== "ALL") {
		
			filteredTodos = filteredTodos.filter( (todo) => {
				
				if(todo.tags) {
					var tags = todo.tags.slice();
					return tags.indexOf(tagFilter) > -1;
				}
				if( !todo.tags && tagFilter === "NO TAGS") {
					return true;
				}
				// items with no tags are excluded  if tagfiler is set;
				return false;
			} );
		}
	
		// console.log(filteredTodos);
		return filteredTodos;
	}
}
