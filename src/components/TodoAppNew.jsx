import React from 'react';
import * as Redux from 'react-redux';

import TodoList from 'TodoList';
import TodoSearch from 'TodoSearch';
// import TodoViewsMenu from 'TodoViewsMenu';
import * as actions from 'actions';

export class TodoAppNew extends React.Component {

    constructor(props) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
        this.handleTodoAdd = this.handleTodoAdd.bind(this);
    }
    
    onLogout (e) {
        e.preventDefault();
        var {dispatch} = this.props;
        dispatch(actions.startLogout());
    }


 	handleTodoAdd( data ) {
            console.log("handle Todo add",data)
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
        
        // var { dispatch, expanded } = this.props;
        
        // var renderAddModal = () => {
        //     if(expanded) {
        //         return <TodoAddModal onTodoAdd={this.handleTodoAdd} />;
        //     }
        // };
		
        return (
            <div id="todo-app">
                <div id="menu" className="child"> menu </div>
                <div id="topbar">
                    <TodoSearch />
                    <div className="child todo-add">add</div>
                </div>
                <div id="leftbar">
                    <div className="child">view1</div>
                    <div className="child">view2</div>
                    <div className="child">view3</div>
                    <div className="child">view4</div>
                    <div className="child">view5</div>
                </div>
                <div id="content">
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
})(TodoAppNew);
