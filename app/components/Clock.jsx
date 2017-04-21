var React = require('react');


var Clock = React.createClass({

	propTypes : {
		totalSeconds : React.PropTypes.number
	},
	
	getDefaultProps : function(){
		totalSeconds : 0
	},

	formatSeconds : function(totalSeconds) {
		 var seconds, minutes;
		 seconds = totalSeconds % 60;
		 minutes = Math.floor( totalSeconds / 60 );

		 if( seconds < 10) {
		 	seconds = '0' + seconds;
		 }
		 if( minutes < 10 ) {
		 	minutes = '0' + minutes;
		 }
		 return minutes + ":" + seconds;
	},
	render : function() {

		var {totalSeconds} = this.props;
		return (
			<div className="clock">
				<span className="clock-text">{this.formatSeconds(totalSeconds)}</span>
			</div>
		);
	}
});


// Object.assign... equals to below:
// Clock.propTypes =  {
// 		totalSeconds : React.PropTypes.number
// }
// Clock.defaultProps : {
// 		totalSeconds : 0
// }

module.exports = Clock;