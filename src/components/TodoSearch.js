import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

import TodoAPI from "../api/TodoAPI";

export class TodoSearch extends React.Component {
  componentDidUpdate(prevProps) {
    if (prevProps.tagFilter !== this.props.tagFilter) {
      this.refs.tagFilter.value = this.props.tagFilter;
    }
  }

  render() {
    const { dispatch, statusFilter, searchText, todos, tagFilter } = this.props;

    const onChangeSearchText = () => {
      const searchText = this.refs.searchText.value;
      dispatch(actions.setSearchText(searchText));
    };

    const filterByStatus = () => {
      const status = this.refs.statusFilter.value;
      dispatch(actions.filterByStatus(status));
    };
    const filterByTag = () => {
      const tagFilter = this.refs.tagFilter.value;
      dispatch(actions.filterByTag(tagFilter));
    };

    const tagList = TodoAPI.getTags(todos, statusFilter).map((tag, index) => {
      return (
        <option key={index} value={tag}>
          {tag}
        </option>
      );
    });

    return (
      <div className="gid-search">
        <select
          className="gid-search-status todo-active-item"
          onChange={filterByStatus}
          ref="statusFilter"
          defaultValue="TODO"
        >
          <option value="ALL">ALL </option>
          <option value="DONE">DONE</option>
          <option value="TODO">TODO</option>
        </select>

        <input
          className="gid-search-text todo-active-item"
          type="text"
          ref="searchText"
          placeholder="Enter search text..."
          value={searchText}
          onChange={onChangeSearchText}
        />

        <select
          className="gid-search-by-tag todo-active-item"
          onChange={filterByTag}
          ref="tagFilter"
          defaultValue="ALL"
        >
          <option key={-2} value="ALL">
            Any Tag
          </option>
          {tagList}
          <option key={-1} value="NO TAGS">
            No Tags
          </option>
        </select>
      </div>
    );
  }
}

export default connect(state => state)(TodoSearch);
