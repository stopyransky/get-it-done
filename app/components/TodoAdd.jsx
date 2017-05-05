var React = require('react');

var TodoAdd = React.createClass({
	
	onFormSubmit: function( e ) {
		e.preventDefault();
		var newTodo = this.refs.newTodo.value;

		if(newTodo.length > 0) {
			this.refs.newTodo.value = "";
			this.props.onAddTodo(newTodo);
		} else {
			this.refs.newTodo.focus();
		}
	},
	
	render : function() {
		return (
			<div id="todoAddForm" className="container__footer">
				<form onSubmit={this.onFormSubmit}>
					<input type='text' ref='newTodo' placeholder="Enter new todo..."/>
					<button className="button expanded">Add Todo</button>
				</form>
			</div>

		);
	}

});

module.exports = TodoAdd;