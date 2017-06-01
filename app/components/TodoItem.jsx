import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import * as actions from "actions";
// import TodoItemEdit from 'TodoItemEdit';

// exporting raw React component for testing purposes
export class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		this.onSaveEdit = this.onSaveEdit.bind(this);
	}

	onSaveEdit() {
		console.log("edit saved");
	}

	render() {
		// dispatch comes from redux.connect
		var {id, text, completed, createdAt, completedAt, editMode, dispatch } = this.props;

		var todoClassName = completed ? 'todo todo-completed' : 'todo todo-inprogress';
		todoClassName = todoClassName+' columns uncentered small-12 medium-12 large-12';

		var renderTodo = () => {
			if(editMode) {
				return <input type="text" value={text} />;
			} else {
				return <span> {text} </span>;
			}
		}
		var renderDate = () => {
			var message = 'Created ';
			var timestamp = createdAt;
			if(completed) {
				message = "Completed ";
				timestamp = completedAt;
			}
			return message + moment.unix(timestamp).format("MMMM Do, YYYY @ h:mm a");
		}

		var renderEditButton = () => {
			if(editMode) {
				return <div className="button expanded hollow success button-save" onClick={onClickEdit}>save</div>;
			} else {
				return <div className="button expanded hollow warning button-edit" onClick={onClickEdit}>edit</div>;
			}
		}

		var renderTagList = () => {
			return (
				<ul className='tag-list'>
					<button className ="tag button small alert">label1</button>
					<button className ="tag button small warning">label2</button>
					<button className ="tag button small success">label3</button>
					<button className ="tag button small success" onClick={onClickNewTag}> + </button>
				</ul>
			);
		}

		var onClickToggle = ()=> {
			/* this.props.onToggle(id)} */
			dispatch(actions.startToggleTodo(id, !completed))
		};

		var onClickDelete = () => {
			dispatch(actions.startDeleteTodo(id));
		};
		var onClickEdit = (id, updates) => {
			console.log("edit action goes here");
			// dispatch(actions.toggleEditTodo(id,!editMode));
		}

		var onClickNewTag = () => {
			console.log("new tag action goes here");
		}

		return (
				<div className={todoClassName} /*onClick={onClickToggle}*/>
					<div className="columns large-8 small-6 medium-6">
						<input type='checkbox' defaultChecked={completed} onChange={onClickToggle} />
						{renderTodo()}
						<br />
						<span className="todo-subtext">{renderDate()}</span>
						{renderTagList()}
						<br/>
					</div>
					<div className="columns uncentered small-6 medium-6 large-2">
						{ renderEditButton() }
						<div className="button expanded hollow alert button-remove" onClick={onClickDelete}>remove</div>
					</div>
				</div>
			);

		}

}
// by default exporting redux-connected TodoItem
export default connect()(TodoItem);


// import TodoItem from 'TodoItem'; // refers to default export (linked to redux)
// import {TodoItem as RawTodoItem} from 'TodoItem'; // refers to raw class
