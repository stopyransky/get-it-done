import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import * as actions from "actions";
import TodoItemTags from 'TodoItemTags';

// exporting raw React component for testing purposes
export class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		this.onClickToggle = this.onClickToggle.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		// this.onFilterByTag = this.onFilterByTag.bind(this);
		this.submitNewTag =  this.submitNewTag.bind(this);
		this.submitRemoveTag =  this.submitRemoveTag.bind(this);
		this.onSaveEdit = this.onSaveEdit.bind(this);
		
		// state is not saved to db, for app only
		this.state = {
			editMode : false
		}
	}

	onClickToggle() {
		var { id, completed, dispatch } = this.props;
		dispatch(actions.startToggleTodo(id, !completed))
	}

	onClickDelete() {
		var { id, dispatch } = this.props;
		dispatch(actions.startDeleteTodo(id));
	}
	
	onSaveEdit(e) {
		e.preventDefault();
		var { id, dispatch } = this.props;
		var newText = this.refs.newText.value;
		
		if(newText.length > 0) {
			this.refs.newText.value = "";
			dispatch(actions.startUpdateTodo(id, { text: newText }))
			this.setState({
				editMode: false
			});
		} else {
			this.refs.newText.focus();
		}
		
							
	}

	submitNewTag( newTag ) {
		var { id, dispatch } = this.props;
		var tags = this.props.tags || [];
		tags.push(newTag);
		var newTags = [ ...tags ];

		dispatch(actions.startUpdateTodo(id, { tags : newTags}));
	}

	submitRemoveTag(index) {
		var { id, dispatch, tags} = this.props;
		if(tags[index]) {
			tags.splice(index,1);
		}

		dispatch(actions.startUpdateTodo(id, { tags : tags}));
	}

	render() {
		// dispatch comes from redux.connect
		var { id, 
			text, 
			completed, 
			createdAt, 
			completedAt,
			dueDate, 
			tags, 
			dispatch } = this.props;

		var todoClassName = completed ? 'todo todo-completed' : 'todo todo-inprogress';
		todoClassName = todoClassName+' columns uncentered small-12 medium-12 large-12';

		var renderTodoText = () => {
			if(this.state.editMode) {
				return (
					<form onSubmit={this.onSaveEdit} >
						<input className="edit-text"
							type="text" 
							defaultValue={text} 
							ref="newText"
							/>
					</form>
				);

					
			} else {
				return <div onClick={()=>{
						this.setState( {
							editMode : true
						})
					}}> {text} </div>
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
		
		var renderDueDate = () => {
			if(dueDate) {
				var message = 'Due date : ';
				var timestamp = dueDate;
				return message + moment.unix(timestamp).format("MMMM Do, YYYY");
			}
			return "No due date for this task.";
		}

		var renderEditButton = () => {
			if(this.state.editMode) {
				return <div className="button expanded hollow success button-save" 
							onClick={this.onSaveEdit}>save
					   </div>;
			} else {
				return <div className="button expanded hollow warning button-edit" 
							onClick={()=>{
								this.setState( {
									editMode : true
								})
							}}>edit</div>;
			}
		}


		return (
			<div className={todoClassName} >
				<div className="columns small-1 medium-1 large-1">
					<input type='checkbox' defaultChecked={completed} onChange={this.onClickToggle} />
				</div>
				<div className="columns small-8 medium-8 large-8" >
					{renderTodoText()}
					<br />
					<span className="todo-subtext">{renderDate()}. {renderDueDate()}</span>
					<br />
					{/*{renderTagList()}*/}
					<TodoItemTags tags={tags} 
						onNewTag={this.submitNewTag}
						onRemoveTag={ this.submitRemoveTag}/>
				</div>
				<div className="columns small-3 medium-3 large-3">
					{ renderEditButton() }
					<div className="button expanded hollow alert button-remove" onClick={this.onClickDelete}>remove</div>
				</div>
			</div>
		);

		}

}
// by default exporting redux-connected TodoItem
export default connect()(TodoItem);