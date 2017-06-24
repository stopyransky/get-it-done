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

	getAllTags : function(todos)  {
		var copy = todos.slice();
		if(copy) {
			var tagSet= new Set();
			copy.forEach((todo) => todo.tags ? todo.tags.forEach((tag) => tagSet.add(tag)): []);
			return [...tagSet];
		} else {
			return ["no tags available"];
		} 
	},

	filterTodos: function(todos, showCompleted, searchText, tagFilter) {
		
		var filteredTodos= todos;
		
		if(tagFilter && tagFilter !== "ALL") {
			
			filteredTodos = filteredTodos.filter( (todo) => {
				
				if(todo.tags) {
					var tags = todo.tags.slice();
					return tags.indexOf(tagFilter) > -1;
				} else if( tagFilter==="NO TAGS") {
					// if todo has no tags and tag filter is 
					return true;
				}

				// items with no tags are excluded  if tagfiler is set;
				return false;
			} );
		}
		// sort todos with according to create date (newest first) 
		filteredTodos.sort( function( a, b ) {
			if(a.createdAt > b.createdAt) return -1;
			else if( a.createdAt < b.createdAt) return 1
			return 0;  
		});

		//filter by showCompleted
		filteredTodos = filteredTodos.filter( (todo) =>{
			return !todo.completed || showCompleted;
		});

		//filter by searchText
		filteredTodos = filteredTodos.filter( (todo) => {
			var text = todo.text.toLowerCase();
			return !searchText || text.indexOf(searchText.toLowerCase()) > -1;
		} );
	
		// console.log(filteredTodos);
		return filteredTodos;
	}
}
