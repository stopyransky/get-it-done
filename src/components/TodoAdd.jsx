import React from 'react';
import {connect} from "react-redux";

import TodoModalAdd from "TodoModalAdd";
import * as actions from 'actions';

export class TodoAdd extends React.Component {
 	

	handleTodoAdd = ( newTodo ) => {
        	var { dispatch } = this.props;
			dispatch(actions.startAddTodo(newTodo))
    } 
	
	render() {
		
		var {dispatch }  = this.props;
		
		return (
			<div id="todo-add">
					<div className="todo-add-button" onClick={ () => {
						var addModal = document.getElementById("todo-add-modal");
							addModal.style.display = "block";
							addModal.style.opacity = '1';
					}}>ADD</div>
				<TodoModalAdd onSubmit={this.handleTodoAdd} />
			</div>
		);
	}
}

var mapStateToProps = state  => state;

export default connect(mapStateToProps)(TodoAdd);
