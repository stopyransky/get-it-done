import React from "react";

export default class TodoViewsMenu extends React.Component {
  render() {
    return (
      <div id="todo-views-menu">
        <div className="todo-view">list view</div>
        <div className="todo-view">tiles view </div>
        <div className="todo-view">gannt view </div>
        <div className="todo-view">urgent/importance view </div>
        <div className="todo-view">network view </div>
      </div>
    );
  }
}
