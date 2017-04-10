
var container = document.getElementById("container");

var React = require('react');
var ReactDOM = require('react-dom');

// presentational component
var AppMessageComponent = React.createClass( {
    
    render : function() {
        
        var name = this.props.name;
        var msg = this.props.msg;
        return (
            <div>
                <h1>Hello {name}!</h1>
                <p>{msg}</p>
            </div>
        );
    } 
} );

// input handling component
var AppFormComponent = React.createClass({
    
    onFormSubmit: function( e ) {
        
        e.preventDefault();
        var updates = {};
        var name = this.refs.name.value;
        var msg  = this.refs.msg.value;
        
        if( name.length > 0 ) {
            this.refs.name.value = ""; // clears text box
            updates.name = name;
        }
        if( msg.length > 0) {
            this.refs.msg.value ="";
            updates.msg = msg;
        }
        
        this.props.onUpdate( updates );
    },

    render : function() {
        return (
            <form onSubmit={ this.onFormSubmit }>
            <input placeholder="Enter name: " type="text" ref="name"/>
            <br/>
            <textarea placeholder="Enter message: " ref="msg"></textarea>
            <br/>
            <button>Submit</button>
            </form> 
        );
    } 
});

//container component
var AppComponent = React.createClass( {

    getDefaultProps : function() {
        return {
            name : 'React',
            msg : 'This is default message from component.'
        }
    },

    getInitialState : function() {
        return {
            name : this.props.name,
            msg : this.props.msg
        }
    },

    handleUpdates  : function( updates ) {
        this.setState( updates );
    },

    render : function() {
        //var name = this.props.name;
        var name = this.state.name;
        var msg = this.state.msg;
        return (
            <div>
                <AppMessageComponent name={name} msg={msg} />
                <AppFormComponent onUpdate={this.handleUpdates} />
            </div>
        );
    }
} );

var firstName = 'Karol';
var message = 'Custom message for ' + firstName;
ReactDOM.render( <AppComponent name={firstName} msg={message}/>, container );

// another method :
// ReactDOM.render( <h1>Hello React2!</h1>, container );
