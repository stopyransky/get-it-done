import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import * as actions from "actions";
// import TodoItemEdit from 'TodoItemEdit';

// exporting raw React component for testing purposes
export class TodoItem extends React.Component {

	constructor(props) {
		super(props);
		this.onClickToggle = this.onClickToggle.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.onClickNewTag = this.onClickNewTag.bind(this);
		this.onSaveEdit = this.onSaveEdit.bind(this);
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
	
	onSaveEdit() {
		var { id, dispatch } = this.props;
		var newText = this.refs.newText.value;
		this.refs.newText = "";
		dispatch(actions.startUpdateTodo(id, { text: newText }))
		this.setState({
			editMode: false
		});
							
	}

	onClickNewTag() {
		console.log("new tag action goes here");
	}

	render() {
		// dispatch comes from redux.connect
		var {id, text, completed, createdAt, completedAt, dispatch } = this.props;

		var todoClassName = completed ? 'todo todo-completed' : 'todo todo-inprogress';
		todoClassName = todoClassName+' columns uncentered small-12 medium-12 large-12';

		var renderTodo = () => {
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

		var renderTagList = () => {
			return (
				<ul className='tag-list'>
					<button className ="tag button hollow small alert"> label1 </button>
					<button className ="tag button hollow small warning"> label2 </button>
					<button className ="tag button hollow small success"> label3 </button>
					<button className ="tag button hollow small success" onClick={this.onClickNewTag}> + </button>
				</ul>
			);
		}

		return (
			<div className={todoClassName} /*onClick={onClickToggle}*/>
				<div className="columns small-1 medium-1 large-1">
					<input type='checkbox' defaultChecked={completed} onChange={this.onClickToggle} />
				</div>
				<div className="columns small-9 medium-9 large-9" >
					{renderTodo()}
					<br />
					<span className="todo-subtext">{renderDate()}</span>
					{renderTagList()}
					<br/>
				</div>
				<div className="columns small-2 medium-2 large-2">
					{ renderEditButton() }
					<div className="button expanded hollow alert button-remove" onClick={this.onClickDelete}>remove</div>
				</div>
			</div>
		);

		}

}
// by default exporting redux-connected TodoItem
export default connect()(TodoItem);