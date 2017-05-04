var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoList = require('TodoList');
var TodoItem = require('TodoItem');
describe("TodoList", () => {
	it("should exist", () => {
		expect(TodoList).toExist();
	});

	it("should render one TodoItem component for each TodoList item", () =>{
			var todos = [{
					id : 1,
					text : "walk the dog"
				}, {
					id : 2, 
					text : "clean the yard"
				}, {
					id : 3,
					text : "learn react"
				}, {
					id : 4, 
					text : "trash bin"
			}];

			var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
			var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, TodoItem);

			expect(todoComponents.length).toBe(todos.length);
	});
});
