var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var Timer = require('Timer');

describe("Timer", () => {
	it("should exist", () => {
		expect(Timer).toExist();
	});

	describe("handleSetTimer", () => {
		it('should set time and set status to started', (done) => {
			var timer = TestUtils.renderIntoDocument(<Timer />);
			timer.handleSetTimer(10);

			expect(timer.state.totalTime).toBe(10);
			expect(timer.state.currentTime).toBe(0);
			expect(timer.state.timerStatus).toBe('started');

			setTimeout(() => {
				expect(timer.state.currentTime).toBe(1);
				done();
			}, 1001);
		});
	});

	describe("handleStatusChange", () => {
		it('should set status', () => {
			var timer = TestUtils.renderIntoDocument(<Timer />);
			timer.handleStatusChange('started');

			expect(timer.state.timerStatus).toBe('started');
		});
	});
});