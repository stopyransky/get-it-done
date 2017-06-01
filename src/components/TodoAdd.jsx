import React from 'react';
import {connect} from "react-redux";
import * as actions from 'actions';
import * as _ from 'lodash';


export class TodoAdd extends React.Component {

	onFormSubmit( e ) {
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
	}

	render() {
		return (
			<div id="todoAddForm" className="container__footer">
				<form onSubmit={this.onFormSubmit.bind(this)}>
					<input type='text' ref='newTodo' placeholder="Enter new todo..."/>
					<button className="button expanded">Add Todo</button>
				</form>
			</div>
		);
	}
}

export default connect()(TodoAdd);
