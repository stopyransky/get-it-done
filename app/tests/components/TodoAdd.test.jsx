var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoAdd = require('TodoAdd');

describe("TodoAdd", () => {
	it("should exist", () => {
		expect(TodoAdd).toExist();
	});

	it("should call onAddTodo prop with valid data", () =>{

		var todoText ='check mail';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<TodoAdd onAddTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.newTodo.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith( todoText );
	});

	it("should not call onAddTodo prop  when invalid input", () =>{

		var todoText ='';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<TodoAdd onAddTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.newTodo.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});
});