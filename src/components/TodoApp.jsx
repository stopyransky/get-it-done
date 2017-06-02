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
        var {dispatch} = this.props;
        e.preventDefault();

        dispatch(actions.startLogout());
    }

 	render() {
		return (
            <div>
                <div className="row page-actions">
                    <a href="#" onClick ={this.onLogout}>Logout</a>
                </div>
                <div className ="row">
                    <div className="columns small-centered medium-uncentered large-uncentered  small-12 medium-12 large-12">
                        <TodoSearch/>
                        <TodoAdd/>
                        <TodoList/>
                    </div>
                </div>
            </div>
		);
	}
}

export default Redux.connect()(TodoApp);
