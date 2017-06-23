import React from 'react';
import TodoSearch from 'TodoSearch';
import TodoAdd from 'TodoAdd';

class TodoTopbar extends React.Component {

    render() {

        return (
            <div id="todo-topbar"> 
                {/*<TodoSearch />*/}
                <TodoAdd />
            </div>
        );
    }
}


export default TodoTopbar;