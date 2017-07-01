import React from 'react';
import {connect} from "react-redux";

import TodoModalAdd from "TodoModalAdd";
import * as actions from 'actions';

export class TodoAdd extends React.Component {
 	
	handleTodoAdd = ( newTodo ) => {
        var { dispatch } = this.props;
		dispatch(actions.startAddTodo(newTodo))
    } 

	openAddModal = () => {
		var addModal = document.getElementById("todo-add-modal");
		addModal.style.display = "block";
		addModal.style.opacity = '1';
	}
	
	render() {
		
		var { dispatch }  = this.props;
		
		return (
			<div id="todo-add">
					<div className="todo-add-button" onClick={ this.openAddModal }>New</div>
				<TodoModalAdd onSubmit={this.handleTodoAdd} />
			</div>
		);
	}
}

var mapStateToProps = state  => state;
// var mapDispatchToProps =  dispatch => dispatch ;

export default connect(mapStateToProps)(TodoAdd);
