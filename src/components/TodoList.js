import React from "react";
import { connect } from "react-redux";

import TodoItem from "./TodoItem";
import TodoAPI from "../api/TodoAPI";

export class TodoList extends React.Component {

  renderTodos = () => {
    const {
      todos,
      statusFilter,
      searchText,
      tagFilter
    } = this.props;

    const filteredTodos = TodoAPI.filterTodos(
      todos,
      statusFilter,
      searchText,
      tagFilter
    );
    
    if (filteredTodos.length === 0) {
      return <p> No tasks. </p>;
    }
    return filteredTodos.map(todo => {
      return <TodoItem key={todo.id} {...todo} />;
    });
  };

  render() {
    return <div className="gid-list">{this.renderTodos()}</div>;
  }
}

export default connect(state => state)(TodoList);
