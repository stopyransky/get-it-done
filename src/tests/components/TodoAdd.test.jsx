var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');
import * as actions from 'actions';
import {TodoAdd} from 'TodoAdd';


describe("TodoAdd", () => {
	it("should exist", () => {
		expect(TodoAdd).toExist();
	});

	it("should dispatch ADD_TODO action when valid data", () =>{

		// var todoText ='check mail';
		var todoItem = {
			text : 'check mail',
			dueDate : "2015-12-10",
			tags : [],
		}

		var action = actions.startAddTodo(todoItem);
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<TodoAdd dispatch={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.text.value = todoItem.text;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toHaveBeenCalledWith( action );
	});

	it("should not dispatch ADD_TODO when invalid input", () =>{

		var todoText ='';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<TodoAdd dispatch={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));

		addTodo.refs.text.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);

		expect(spy).toNotHaveBeenCalled();
	});
});
