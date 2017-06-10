import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList';
import TodoAdd from 'TodoAdd';
import TodoSearch from 'TodoSearch';
import TodoViewsMenu from 'TodoViewsMenu';
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
            <div id="todo-app-new">
            <div id="menu">
                <div className="child"> menu</div>
            </div>
            <div id="topbar">
                <div id='todo-app-settings'>
                <form>
                    <input type="text"/>
                    <button>Search
                    </button>
                    <label >
                    <input type="checkbox" />
                    Check me 
                    </label>
                </form>
                </div>
                <div className="child" id="add">+</div>
            </div>
            <div id="leftbar">
                <div className="child">view1</div>
                <div className="child">view2</div>
                <div className="child">view3</div>
            </div>
            <div id="content">content</div>
            </div>
		);
	}
}

export default Redux.connect()(TodoApp);
