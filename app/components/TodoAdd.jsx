var React = require('react');
var {connect} = require('react-redux');
var actions = require('actions');
var _ = require('lodash');
export var TodoAdd = React.createClass({

	onFormSubmit: function( e ) {
		e.preventDefault();
// dispatch is available in props because TodoAdd component was passed via redux connect method when exporting

		var { dispatch } = this.props;
		var newTodo = _.capitalize(this.refs.newTodo.value);

		if(newTodo.length > 0) {
			this.refs.newTodo.value = "";
			// this.props.onAddTodo(newTodo);
			dispatch(actions.startAddTodo(newTodo))
		} else {
			this.refs.newTodo.focus();
		}
	},

	render : function() {
		return (
			<div id="todoAddForm" className="container__footer">
				<form ref='form' onSubmit={this.onFormSubmit}>
					<input type='text' ref='newTodo' placeholder="Enter new todo..."/>
					<button className="button expanded">Add Todo</button>
				</form>
			</div>

		);
	}

});


export default connect()(TodoAdd);
// module.exports = TodoAdd;
