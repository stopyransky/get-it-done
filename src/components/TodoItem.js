import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import * as actions from "../redux/actions";
import TodoItemTags from './TodoItemTags';
import TodoModalDelete from './TodoModalDelete';

// exporting raw React component for testing purposes
export class TodoItem extends React.Component {

	constructor(props) {
		super(props);

		this.submitNewTag =  this.submitNewTag.bind(this);
		this.submitRemoveTag =  this.submitRemoveTag.bind(this);
		this.onSaveEdit = this.onSaveEdit.bind(this);
		this.cancelTextEdit = this.cancelTextEdit.bind(this);
		// state is not saved to db, for app only
		this.state = {
			editMode : false
		}
	}

	componentDidMount() {
	
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
		// console.log(tags[index]);
		if(tags[index] || tags[index] === "") {
			tags.splice(index,1);
		}

		dispatch(actions.startUpdateTodo(id, { tags : tags}));
	}

	submitFilterByTag = (tag) => {
		this.props.dispatch(actions.filterByTag(tag));
	}

	componentDidUpdate(prevProps, prevState) {
		// console.log(prevProps, prevState)
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
		
		var { editMode } = this.state;

		var setEditModeTrue = () => {
			this.setState( {
				editMode : true
			})
		}

		var renderTodoText = () => {
			if(editMode) {
				return (
					<form className="todo-item-contents-maintext" onSubmit={this.onSaveEdit} >
						<input className="edit-text"
							type="text" 
							defaultValue={text} 
							ref="newText"
							onBlur={this.cancelTextEdit}
							/>
					</form>
				);

					
			} else {
				return ( 
					<div className="todo-item-contents-maintext" /*onClick={ setEditModeTrue } */>
						<span >{text}</span>
					</div>
				);
			}   
		}
		
		var renderDate = () => {
			var message = 'Created ';
			var timestamp = createdAt;
			// if(completed) {
			// 	message = "Completed ";
			// 	timestamp = completedAt;
			// }
	
			// return createdAt;
			return message + moment.unix(timestamp).format("DD MM YYYY @ hh:mm ");
		}
		
		var renderDueDate = () => {
			if(dueDate) {
				var message = ' Due date : ';
				var timestamp = dueDate;
				return message + moment.unix(timestamp).format("MMMM Do, YYYY");
			}
			return " No due date for this task.";
		}

		var renderEditButton = () => {
			if(this.state.editMode) {
				return <div onClick={this.onSaveEdit}>save </div>;
			} else {
				return <div onClick={ setEditModeTrue }>edit</div>;
			}
		}


		return (
			<div tabIndex="2" className="todo-item">
				<div className="group">
					<div className="todo-item-checkbox" onClick={this.props.onClickToggle}> 
						{ completed? "UNDO" : "DONE"}
						{/*<input type="checkbox" defaultChecked={completed} onChange={this.props.onClickToggle}/>*/}
					</div>
					<div className="todo-item-contents" >
						{renderTodoText()}
						<TodoItemTags tags={tags} 
							onTagFilter={this.submitFilterByTag}
							onNewTag={this.submitNewTag}
							onRemoveTag={ this.submitRemoveTag}/>
					</div>
				</div>
				<div className="todo-item-controls">
					{ renderEditButton() }
					<div onClick ={ () => {
						
						var modal = document.getElementById(id+"-modal");
						modal.style.display = "block";
					} }>delete</div>
				</div>
			
				<TodoModalDelete id={id} text={text} onConfirm={this.props.onClickDelete} />
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