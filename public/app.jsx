
var container = document.getElementById("container");

// another method
var AppComponent = React.createClass( {

    getDefaultProps : function() {
        return {
            name : 'React',
            msg : 'This is default message from component.'
        }
    },
    handleSubmitButton : function( e ) {
        e.preventDefault();

        var stuff = this.refs.stuff.value;
        alert(stuff);
    },
    render : function() {
        var name = this.props.name;
        var msg = this.props.msg;
        return (
            <div>
                <h1>Hello {name}!</h1>
                <p>{msg}</p>
                <form onSubmit={this.handleSubmitButton}>
                    <input type="text" ref="stuff"/>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
} );

var firstName = 'Karol';
var message;
message = 'Custom message for Karol.';
ReactDOM.render( <AppComponent name={firstName} msg={message}/>, container );

// another method :
// ReactDOM.render( <h1>Hello React2!</h1>, container );
