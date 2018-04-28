import React from 'react'
import TodoSearch from './TodoSearch';
import TodoAdd from './TodoAdd';
import TodoMenu from './TodoMenu';

class TodoHeader extends React.Component {
  render () {
    return (
      <div className='gid-header'>
        <div className="gid-header-main">
          <TodoMenu />

          <div className="gid-logo">Get It Done</div>
          <TodoAdd />
        </div>
        <div className="gid-header-filters"> 
          <TodoSearch />
        </div>
      </div>
    )
  }
}

export default TodoHeader
