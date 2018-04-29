import React from "react";
import { connect } from "react-redux";

import * as actions from "../redux/actions";

export class TodoMenu extends React.Component {
  togglePanel = () => {
    if (this.props.expanded) {
      this.props.dispatch(actions.hideLeftbarPanel());
    } else {
      this.props.dispatch(actions.showLeftbarPanel());
    }
  };

  render() {
    return (
      <div className="gid-menu todo-active-item" onClick={this.togglePanel} />
    );
  }
}

export default connect(state => state)(TodoMenu);
