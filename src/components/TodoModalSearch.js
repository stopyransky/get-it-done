import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

import TodoAPI from "TodoAPI";

const mapStateToProps = state => {
  return {
    showCompleted: state.showCompleted,
    searchText: state.searchText,
    todos: state.todos,
    tagFilter: state.tagFilter
  };
};

class TodoModalSearch extends React.Component {
  componentDidMount() {
    window.addEventListener("click", this.clickAway);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.clickAway);
  }

  clickAway = event => {
    const modal = document.getElementById("todo-search-modal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  onClose = event => {
    const modal = document.getElementById("todo-search-modal");
    modal.style.display = "none";
  };
  onChangeSearchText = () => {
    const searchText = this.refs.searchText.value;
    dispatch(actions.setSearchText(searchText));
  };

  filterByStatus = () => {
    const status = this.refs.statusFilter.value;
    dispatch(actions.filterByStatus(status));
  };

  filterByTag = () => {
    const tagFilter = this.refs.tagFilter.value;
    dispatch(actions.filterByTag(tagFilter));
  };

  render() {
    const { dispatch, statusFilter, searchText, todos, tagFilter } = this.props;
    const tagList = TodoAPI.getAllTags(todos).map((tag, index) => (
      <option key={index} value={tag}>
        {tag}
      </option>
    ));

    return (
      <div id="todo-search-modal">
        <div id="todo-search-modal-contents">
          <div className="todo-modal-search-close" onClick={this.onClose}>
            &times;
          </div>
          <select
            id="todo-search-status"
            onChange={filterByStatus}
            ref="statusFilter"
            defaultValue="TODO">
            <option value="ALL">ALL </option>
            <option value="DONE">DONE</option>
            <option value="TODO">TODO</option>
          </select>

          <input
            id="todo-search-text"
            type="text"
            ref="searchText"
            placeholder="Enter search text..."
            value={searchText}
            onChange={onChangeSearchText}/>

          <select
            id="todo-search-by-tag"
            onChange={filterByTag}
            ref="tagFilter"
            defaultValue="ALL">
            <option key={-2} value="ALL">
              Any Tag
            </option>
            {tagList}
            <option key={-1} value="NO TAGS">
              No Tags
            </option>
          </select>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(TodoModalSearch);
