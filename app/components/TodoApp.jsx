var React = require('react');
var TodoList = require('TodoList');
var TodoAdd = require('TodoAdd');
var TodoSearch = require('TodoSearch');
var uuid = require('uuid');

var TodoApp = React.createClass({
	getInitialState : function() {
		return {
			showCompleted : false,
			searchText : "",
			todos : [
				{
					id :  uuid(),
					text : "walk the dog",
					completed : false
				},
				{
					id : uuid(), 
					text : "clean the yard",
					completed : true
				},
							{
					id :  uuid(),
					text : "learn react",
					completed : true
				},
				{
					id : uuid(), 
					text : "trash bin",
					completed : false
				}
			]
		};
	},

	handleAddTodo : function(text) {
		this.setState({
			todos : [...this.state.todos, {
				id : uuid(),
				text : text,
				completed : false
			}],
		});
		// alert('new todo: ' + text);
	},

	handleSearch : function( showCompleted, searchText ) {
		this.setState({
			showCompleted : showCompleted,
			searchText : searchText.toLowerCase()
		});


	},
	handleToggle : function( id ) {
		var updatedTodos= this.state.todos.map( function(todo) {
			if(todo.id === id) {
				todo.completed = !todo.completed;
			}
			return todo;
		});

		this.setState({
			todos : updatedTodos
		})
	},
 	render : function() {
		var {todos} = this.state;
		return (
			<div>
				<h1 className="page-title">TodoApp</h1>
				<TodoSearch onSearch={this.handleSearch} />
				<TodoList todos={todos} onToggle={this.handleToggle} />
				<br/>
				<TodoAdd onAddTodo={this.handleAddTodo} />
			</div>
		);
	}
});

module.exports = TodoApp;