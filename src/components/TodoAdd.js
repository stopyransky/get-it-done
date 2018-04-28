import React from 'react';
import {connect} from "react-redux";

import TodoModalAdd from "./TodoModalAdd";
import * as actions from '../redux/actions';

const mapStateToProps = state => state;

export class TodoAdd extends React.Component {

	handleTodoAdd = (newTodo) => {
    const { dispatch } = this.props;
    dispatch(actions.startAddTodo(newTodo))
    const addModal = document.getElementsByClassName("todo-add-modal")[0];
    addModal.style.display = "none";
	}

	openAddModal = () => {
		const addModal = document.getElementsByClassName("todo-add-modal")[0];
		addModal.style.display = "block";
		addModal.style.opacity = '1';
	}

	render() {
		const { dispatch } = this.props;
		return (
			<div className="gid-add">
				<div className="gid-add-button todo-active-item" onClick={ this.openAddModal }>New</div>
				<TodoModalAdd onSubmit={this.handleTodoAdd} />
			</div>
		);
	}
}

export default connect(mapStateToProps)(TodoAdd);
