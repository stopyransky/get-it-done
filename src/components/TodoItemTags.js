import React from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

class TodoItemTags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: false,
      toggleOnRemove: false
    };
  }

  onAddTag = e => this.setState({ editMode: true });

  onFilterByTag = tag => this.props.onTagFilter(tag);

  passNewTag = e => {
    e.preventDefault();
    const newTag = this.refs.newTag.value;
    this.props.onNewTag(newTag.trim());
    this.setState({ editMode: false });
  }

  cancelNewTag = e => {
    e.preventDefault();
    this.refs.newTag.value = "";
    this.setState({ editMode: false });
  }

  passRemoveTag = index => {
    if (this.props.tags[index] || this.props.tags[index] === "") {
      this.props.onRemoveTag(index);
      this.setState({
        toggleOnRemove: !this.state.toggleOnRemove
      });
    }
  }

  componentDidUpdate() {
    if (this.state.editMode) {
      this.refs.newTag.focus();
    }
  }

  renderAddTag = () => {
    if (this.state.editMode) {
      return (
        <div key={-1} className="tag-add-form">
          <form onSubmit={this.passNewTag}>
            <input
              type="text"
              ref="newTag"
              size="10"
              placeholder="new tag"
              onBlur={this.cancelNewTag}
            />
          </form>
        </div>
      );
    } else {
      return (
        <div key={-1} className="tag-add" onClick={this.onAddTag}>&#xff0b;</div>
      );
    }
  }

  render() {
    const { tags } = this.props;
    let listItems = [];
    
    if (tags && tags.length > 0) {
      listItems = tags.map((tag, index) => {
        return (
          <div className="tag" key={index}>
            <div
              className="tag-content"
              onClick={() => this.onFilterByTag(tag)} >
              {tag}
            </div>
            <div
              className="tag-remove"
              onClick={() => this.passRemoveTag(index)}>
              &#xff0d;
            </div>
          </div>
        );
      });
    }
    listItems.push(this.renderAddTag());
    return <ul className="tag-list">{listItems}</ul>;
  }
}

export default TodoItemTags;
