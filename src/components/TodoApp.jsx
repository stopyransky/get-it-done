import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList';
import TodoAdd from 'TodoAdd';
import TodoSearch from 'TodoSearch';
import * as actions from 'actions';

// import {TodoItem as RawTodo} from 'TodoItem';
// import TodoItem from 'TodoItem';
// console.log(RawTodo);
// console.log(TodoItem);

export class TodoApp extends React.Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }
    
    onLogout (e) {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(actions.startLogout());
    }

 	render() {
		return (
            <div id="todo-app">
                <div id="todo-app-header" className="row page-actions">
                    <a href="#" onClick ={this.onLogout}>Logout</a>
                </div>
                <div id="todo-app-body" className ="row">                    
                    <TodoSearch/>
                    <TodoAdd/>
                    <TodoList/>
                </div>
            </div>
		);
	}
}

export default Redux.connect()(TodoApp);
