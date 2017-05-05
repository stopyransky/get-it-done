var React = require('react');
var Clock = require('Clock');
var CountdownForm = require("CountdownForm");
var CountdownControls = require("CountdownControls");

var Timer = React.createClass({

	getInitialState : function() {
		return {
			currentTime : 0,
			totalTime : 0,
			timerStatus : 'stopped'
		}
	},
	
	handleSetTimer : function( seconds ) {
		this.setState({
			currentTime : 0,
			totalTime: seconds,
			timerStatus: "started"
		});
	},
	
	handleStatusChange : function( newStatus ) {
		this.setState({
			timerStatus: newStatus
		});
	},

	startTimer : function() {
		this.timer = setInterval( () => {
			var newTime = this.state.currentTime + 1;
			var total = this.state.totalTime;
			this.setState({
				currentTime : newTime < total ? newTime : total
			});

			if( newTime === total) {
				this.handleStatusChange('stopped');
			}
		}, 1000);
	},

	componentDidUpdate : function( prevProps, prevState ) {
		if(this.state.timerStatus !== prevState.timerStatus) {
			switch( this.state.timerStatus ) {
				case 'started':
					this.startTimer();
					break;
				case 'stopped' :
					var total = this.state.totalTime;
					this.setState({ 
						currentTime : total,
					});
				case 'paused' :
					clearInterval( this.timer );
					this.timer = null;
					break;
			}
		}
	},

	componentWillUnmount : function ( ) {
		clearInterval(this.timer);
		this.timer = null;
	},

	render : function() {

		var { currentTime, timerStatus } = this.state;

		var renderControlArea = () => {
			if(timerStatus !== 'stopped') {
				return <CountdownControls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange} />
			} else {
				return <CountdownForm onSetCountdown={this.handleSetTimer}/>
			}
		};

		return (
			<div className="columns medium-6 large-4 small-centered">
				<h1 className="text-center page-title"> Timer </h1>
				<Clock totalSeconds={currentTime}/>
				{renderControlArea()}
			</div>
		);
	}
});

	
module.exports = Timer;
