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

    onLogout (e) {
        var {dispatch} = this.props;
        e.preventDefault();

        dispatch(actions.startLogout());
    }

 	render() {
		return (
            <div>
                <div className="row page-actions">
                    <a href="#" onClick ={this.onLogout.bind(this)}>Logout</a>
                </div>
                <div className ="row">
                    <div className="columns small-centered medium-uncentered large-uncentered small-12 medium-4 large-4">
                        <TodoSearch/>
                    </div>
                    <div className="columns small-centered medium-uncentered large-uncentered  small-12 medium-8 large-8">
                        <TodoAdd/>
                        <TodoList/>
                    </div>
                </div>
            </div>
		);
	}
}

export default Redux.connect()(TodoApp);
