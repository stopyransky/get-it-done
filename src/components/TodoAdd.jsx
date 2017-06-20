import React from 'react';
import {connect} from "react-redux";

// import * as _ from 'lodash';
// import moment from 'moment';

import TodoModalAdd from "TodoModalAdd";
import * as actions from 'actions';

export class TodoAdd extends React.Component {
 	
	constructor(props) {
        super(props);
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
		this.handleSimpleTodoAdd = this.handleSimpleTodoAdd.bind(this);
    }

	handleSimpleTodoAdd( newTodoText ) {
		// e.preventDefault();
		var { dispatch } = this.props;
		var newTodo =  newTodoText;
		
		// this is checked in add modal now - ulitmately whole handler will be moved there
		// if(newTodo.length > 0) {
			// this.refs.newTodo.value = "";

		dispatch(actions.startAddTodo({ text: newTodo}))

		// } else {
		// 	this.refs.newTodo.focus();
		// }
	}

	handleTodoAdd( data ) {
            console.log("handle Todo add", data )
        	var { dispatch } = this.props;

        	var tagsRef = data.tags.value.split(",");
        	var tags = [];
            
            
        	if(tagsRef.length > 0) {
                
        		tagsRef.forEach( ( tag )=> {
        			var t = tag.trim();
        			if(t) tags.push(t);
        		});
        	}

        	// check due date input here
            
        	var newTodo = {
        		text: _.capitalize(data.text.value),
        		dueDate : moment(data.dueDate.value, "YYYY-MM-DD").unix(),
        		tags 
        	} 

        	if(newTodo.text.length > 0) {
        		// this.refs.text.value = "";
        		// this.refs.dueDate.value="";
        		// this.refs.tags.value="";
        		dispatch(actions.startAddTodo(newTodo))
        	} 
            // else {
        	// 	this.refs.text.focus();
        	// }
            dispatch(actions.toggleExpandAddTodo());
    } 
	
	render() {
		
		var {dispatch, expanded }  = this.props;
		
		return (
			<div>
				<form id="todo-add" /*onSubmit={this.handleSimpleTodoAdd}*/>
					{/*<input type="text" ref="newTodo" placeholder="Add todo..." />*/}
					{/*<button id="todo-add-more">more...</button>*/}
					<div className="todo-add-button" /*onClick={this.handleSimpleTodoAdd}*/ onClick={()=>{
						var addModal = document.getElementById("add-modal");
							addModal.style.display = "block";
					}}>ADD</div>
				</form>
				<TodoModalAdd onSubmit={this.handleSimpleTodoAdd} />
			</div>
		);
	}
}

var mapStateToProps = (state, ownProps ) => {
	return {
		expanded: state.addExpanded
	}
}
export default connect(mapStateToProps)(TodoAdd);
