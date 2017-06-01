var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var CountdownForm=require('CountdownForm');

describe("CountdownForm", () => {
	it("should exist", () => {
		expect(CountdownForm).toExist();
	});

	it('should call onSetCountdown if valid seconds entered', () => {
		var spy = expect.createSpy();
		var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
		var $el= $(ReactDOM.findDOMNode(countdownForm)); 
		countdownForm.refs.seconds.value = '109';
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith(109);
	});
	it('should not call onSetCountdown if invalid seconds entered', () => {
		var spy = expect.createSpy();
		var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
		var $el= $(ReactDOM.findDOMNode(countdownForm)); 
		countdownForm.refs.seconds.value = '109abc';
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});
	it('should not submit if the input field is empty', () => {
		var spy = expect.createSpy();
		var countdownForm = TestUtils.renderIntoDocument(<CountdownForm onSetCountdown={spy}/>);
		var $el= $(ReactDOM.findDOMNode(countdownForm)); 
		countdownForm.refs.seconds.value = '';
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	})
});