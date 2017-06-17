import React from 'react';
import * as Redux from 'react-redux';

import * as actions from 'actions';
import TodoMenu from 'TodoMenu';
import TodoTopbar from 'TodoTopbar';
import TodoLeftbar from 'TodoLeftbar';
import TodoList from 'TodoList';

export class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
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
		
        return (
            <div id="todo-app">
                <div id="menu">
                    <TodoMenu />
                </div>
                <div id="topbar">
                    <TodoTopbar />
                </div>
                <div id="leftbar">
                    <TodoLeftbar />
                </div>
                <div id="contents">
                    <TodoList />
                </div>
            </div>
		);
	}
}

export default Redux.connect((state) => {
    return {
        expanded : state.addExpanded
    } 
})(TodoApp);
