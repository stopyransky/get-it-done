var React = require('react');


class Clock extends React.Component {

	constructor(props) {
		super(props);
		this.state = {};
		
	}

	formatSeconds(totalSeconds) {
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
	}

	render() {
		var {totalSeconds} = this.props;
		return (
			<div className="clock">
				<span className="clock-text">{this.formatSeconds(totalSeconds)}</span>
			</div>
		);
	}
}

Object.assign( Clock, {
	propTypes : {
		totalSeconds : React.PropTypes.number
	},
	defaultProps : {
		totalSeconds : 0
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