import React from 'react';
import * as Redux from 'react-redux';

import TodoTopbar from 'TodoTopbar';
import TodoLeftbar from 'TodoLeftbar';
import TodoList from 'TodoList';

export class TodoApp extends React.Component {
    
    render() {
		
        return (
            <div>
                <TodoLeftbar />
                <div id="todo-app">
                    <TodoTopbar />
                    <TodoList />
                    
                </div>
            </div>
		);
	}
}

export default Redux.connect(state => state)(TodoApp);
