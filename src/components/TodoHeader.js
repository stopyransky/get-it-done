import React from 'react'
import TodoSearch from './TodoSearch';
import TodoAdd from './TodoAdd';
import TodoMenu from './TodoMenu';

class TodoHeader extends React.Component {
  render () {
    return (
      <div className='todo-header'>
        <div className="topbar-main">
          <TodoMenu />
          <div className="todo-header__logo">Get It Done</div>
          <TodoAdd />
        </div>
        <div className="topbar"> 
          <TodoSearch />
        </div>
      </div>
    )
  }
}

export default TodoHeader
