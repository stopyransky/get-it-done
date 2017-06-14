import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import * as actions from "actions";
import TodoItemTags from 'TodoItemTags';

// exporting raw React component for testing purposes
export class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		// this.onClickToggle = this.onClickToggle.bind(this);
		// this.onClickDelete = this.onClickDelete.bind(this);
		// this.onFilterByTag = this.onFilterByTag.bind(this);
		this.submitNewTag =  this.submitNewTag.bind(this);
		this.submitRemoveTag =  this.submitRemoveTag.bind(this);
		this.onSaveEdit = this.onSaveEdit.bind(this);
		this.cancelTextEdit = this.cancelTextEdit.bind(this);
		// state is not saved to db, for app only
		this.state = {
			editMode : false
		}
	}

	// onClickToggle() {
	// 	var { id, completed, dispatch } = this.props;
	// 	dispatch(actions.startToggleTodo(id, !completed))
	// }

	// onClickDelete() {
	// 	var { id, dispatch } = this.props;
	// 	dispatch(actions.startDeleteTodo(id));
	// }
	
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

	cancelTextEdit(e) {
		e.preventDefault();
		this.refs.newText.value ="";
		this.setState({
			editMode : false
		});
	}

	submitNewTag( newTag ) {
		var { id, dispatch } = this.props;
		var tags = this.props.tags || [];

		// prevent adding empty inputs
		if(newTag.length > 0) {

			// check duplicates
			if(tags.length > 0) {
				tags.forEach((tag)=>{
					if(tag === newTag) return;
				});

			}
			tags.push(newTag);
			var newTags = [ ...tags ];
			dispatch(actions.startUpdateTodo(id, { tags : newTags}));
		}
		
	}

	submitRemoveTag(index) {
		var { id, dispatch, tags} = this.props;
		console.log(tags[index]);
		if(tags[index] || tags[index] === "") {
			tags.splice(index,1);
		}

		dispatch(actions.startUpdateTodo(id, { tags : tags}));
	}

	componentDidUpdate() {
		if(this.state.editMode) {
			this.refs.newText.focus();
		}
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

		var todoClassName = completed ? 'todo-item todo-completed' : 'todo-item todo-inprogress';
		todoClassName = todoClassName+' columns centered small-12 medium-12 large-12';

		var renderTodoText = () => {
			if(this.state.editMode) {
				return (
					<form onSubmit={this.onSaveEdit} >
						<input className="edit-text"
							type="text" 
							defaultValue={text} 
							ref="newText"
							onBlur={this.cancelTextEdit}
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
				<div className="todo-item-checkbox columns small-1 medium-1 large-1">
					<input type='checkbox' defaultChecked={completed} onChange={this.props.onClickToggle} />
				</div>
				<div className="todo-item-contents columns small-8 medium-8 large-8" >
					{renderTodoText()}
					<p className="todo-item-contents-subtext">{renderDate()}</p>
					<p className="todo-item-contents-subtext">{renderDueDate()}</p>
					<TodoItemTags tags={tags} 
						onNewTag={this.submitNewTag}
						onRemoveTag={ this.submitRemoveTag}/>
				</div>
				<div className="todo-item-controls columns small-3 medium-3 large-3">
					{ renderEditButton() }
					<div className="button expanded hollow alert button-remove" onClick={this.props.onClickDelete}>remove</div>
				</div>
			</div>
		);
	}
}

/**
 * Identify which props on this component should be overwritten with store state
 * Allows using store state in connected component
 * @param {*} state store state 
 * @param {*} ownProps this component props
 */
var mapStateToProps = state => state;

var mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch,  
		onClickToggle : () => {
			var { id, completed } = ownProps;
			dispatch(actions.startToggleTodo(id, !completed))
		},

		onClickDelete : () => {
			var { id } = ownProps;
			dispatch(actions.startDeleteTodo(id));
		}
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( TodoItem );