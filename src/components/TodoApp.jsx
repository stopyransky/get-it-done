import React from 'react';
import * as Redux from 'react-redux';

// import * as actions from 'actions';
import TodoMenu from 'TodoMenu';
import TodoTopbar from 'TodoTopbar';
import TodoLeftbar from 'TodoLeftbar';
import TodoList from 'TodoList';

export class TodoApp extends React.Component {
    
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

export default Redux.connect(state => state)(TodoApp);
