import React from 'react';
import * as Redux from 'react-redux';

// import * as actions from 'actions';
// import TodoMenu from 'TodoMenu';
import TodoTopbar from 'TodoTopbar';
import TodoLeftbar from 'TodoLeftbar';
import TodoList from 'TodoList';

export class TodoApp extends React.Component {
    
    render() {
		
        return (
            <div id="todo-app">
                <TodoTopbar />
                <TodoList />
            </div>
		);
	}
}

export default Redux.connect(state => state)(TodoApp);
