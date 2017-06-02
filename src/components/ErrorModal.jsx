var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ErrorModal = React.createClass({

	getDefaultProps : function() {
		return {
			title: "Error"
		};
	},
	
	propTypes : {
		title : React.PropTypes.string,
		message : React.PropTypes.string.isRequired
	},

	componentDidMount : function() {
		var { title, message }= this.props;
		var modalMarkup = (
			<div id="error-modal" className="reveal tiny text-center" data-reveal="">
				<h4>{title}</h4>
				<p> {message} </p>
				<button className = "button hollow" data-close="">OK</button>
			</div>
		);

		// jquery selector
		var $modal = $(ReactDOMServer.renderToString(modalMarkup));
		$(ReactDOM.findDOMNode(this)).html($modal);
		
		var modal = new Foundation.Reveal($("#error-modal"));
		modal.open(); // here foundation is messing (adding new) with commponents that react manages therefore
		// above modalMarkup is needed to be reloaded by React server and dom each time we have error
	},
	
	render : function() {
		return (<div></div>);
	}
});

module.exports = ErrorModal;