import React from 'react';
import {connect} from "react-redux";
import * as actions from '../redux/actions';

class TodoItemTags extends React.Component {

    constructor(props) {
        super(props);
		// this.onAddTag = this.onAddTag.bind(this);
		// this.onFilterByTag = this.onFilterByTag.bind(this);
		// this.passRemoveTag = this.passRemoveTag.bind(this);
        // this.passNewTag = this.passNewTag.bind(this);
        // this.cancelNewTag = this.cancelNewTag.bind(this);
        this.state = {
            editMode : false,
            toggleOnRemove : false
        }
    }



    onAddTag = (e) => {
        this.setState({
            editMode: true
        });
 
    }

    onFilterByTag = (tag) => {
        this.props.onTagFilter(tag);
        // console.log("filter by tag action goes here",tag);
    }
        
    passNewTag = (e) => {
        e.preventDefault();
        var newTag= this.refs.newTag.value;
        
        this.props.onNewTag(newTag.trim());
        this.setState({
            editMode: false
        });
    }
    
    cancelNewTag = (e) => {
        e.preventDefault();
        this.refs.newTag.value = "";
        this.setState({
            editMode: false
        });
    }
    
    passRemoveTag = (index) => {
        // console.log("remove tag action goes here");
        if(this.props.tags[index] || this.props.tags[index] === "") {
            this.props.onRemoveTag(index);
            this.setState({
                toggleOnRemove : !this.state.toggleOnRemove
            });
        }
    }

    componentDidUpdate() {
        if(this.state.editMode) {
            this.refs.newTag.focus();
        }
    }


    render() {
        
        var {tags} = this.props;
        var listItems = [];

        var self = this;

        var renderAddTag = () =>{
            if(this.state.editMode ) {
                return (
                    <div key={-1} className="tag-add-form">
                        <form onSubmit={this.passNewTag}>
                            <input type="text" ref="newTag" size="10" placeholder="new tag" onBlur={this.cancelNewTag}/>
                        </form>
                    </div>
                );
            } else {
                return  (
                    <div key={-1} className ="tag-add" onClick={this.onAddTag}> &#xff0b; </div>
                    
                );
            }
        };

        if(tags && tags.length > 0) {
            listItems = tags.map(( tag, index ) => {
                return (
                    <div className="tag" key={index} >
                        <div className ="tag-content" onClick={() => self.onFilterByTag(tag)}>{tag}
                        </div>
                        <div className ="tag-remove" 
                                onClick={() => {
                                    self.passRemoveTag(index);
                                }}> &#xff0d; 
                        </div>
                    </div>
                );
            });
        }
        listItems.push(renderAddTag());

        return (
            <ul className='tag-list'>
                {listItems}
            </ul>
          
        );
        
	}
    

}

export default TodoItemTags;