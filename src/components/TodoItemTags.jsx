import React from 'react';
import {connect} from "react-redux";
import * as actions from 'actions';

export class TodoItemTags extends React.Component {

    constructor(props) {
        super(props);
		this.onAddTag = this.onAddTag.bind(this);
		this.onFilterByTag = this.onFilterByTag.bind(this);
		this.onRemoveTag = this.onRemoveTag.bind(this);
    }

    onAddTag() {
        console.log("add new tag action goes here");
    }

    onFilterByTag() {
        console.log("filter by tag action goes here");
    }

    onRemoveTag() {
        console.log("remove tag action goes here");
    }

    render() {
        
        var {tags} = this.props;
        
        var listItems = [];

        var self = this;
        
        if(tags && tags.length > 0) {

            listItems = tags.map(( tag, index ) => {
                // if(tag) { 
                    return (
                        <div className="tag" key={index}  style={{display:"inline"}}>
                            <button className ="tag-content button hollow small alert collapse" 
                                    onClick={self.onFilterByTag}>{tag}
                            </button>
                            <button className ="tag-remove button small alert collapse" 
                                    onClick={self.onRemoveTag}> - 
                            </button>
                        </div>
                    );
                // }
                // return;
            });
        }

        listItems.push(
            <div key="-1" className="tag" style={{display:"inline"}}>
                <button  className ="tag-add button hollow small success" onClick={self.onAddTag}> + </button>
            </div>);
            
        return <ul className='tag-list'>{listItems}</ul>;
	}
}

export default connect()(TodoItemTags);