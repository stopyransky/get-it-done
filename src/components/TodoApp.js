import React from 'react';
import * as Redux from 'react-redux';

import TodoLeftbar from './TodoLeftbar';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';

export class TodoApp extends React.Component {
    
    render() {
        return (
            <div>
                <TodoLeftbar />
                <div id="todo-app">
                    <TodoHeader />
                    <TodoList />
                </div>
            </div>
		);
	}
}

export default Redux.connect(state => state)(TodoApp);
