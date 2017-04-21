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
		return (
			<div>
				<h1 className="text-center page-title"> Clock </h1>
			</div>
		);
	}
}

module.exports = Clock;