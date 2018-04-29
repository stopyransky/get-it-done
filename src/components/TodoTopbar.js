import React from "react";

import TodoSearch from "./TodoSearch";
import TodoAdd from "./TodoAdd";
import TodoMenu from "./TodoMenu";

class TodoTopbar extends React.Component {
  render() {
    return (
      <div id="topbar">
        <TodoMenu />
        <TodoSearch />
        <TodoAdd />
      </div>
    );
  }
}

export default TodoTopbar;
