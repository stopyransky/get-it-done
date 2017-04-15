var React = require("react");
var GreetMessage = require("GreetMessage");
var GreetForm = require("GreetForm");

var Greeter = React.createClass( {

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
            <div id='greeter'>
                <GreetMessage name={name} msg={msg} />
                <GreetForm onUpdate={this.handleUpdates} />
            </div>
        );
    }
} );
module.exports = Greeter;