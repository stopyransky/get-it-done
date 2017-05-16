var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

// var TodoList = require('TodoList');
import {configure} from 'store';
import ConnectedTodoList, { TodoList } from 'TodoList';
import ConnectedTodoItem, {TodoItem} from 'TodoItem';

// var TodoItem = require('TodoItem');

describe("TodoList", () => {
	it("should exist", () => {
		expect(TodoList).toExist();
	});

	it("should render one TodoItem component for each TodoList item", () =>{
			var todos = [{
					id : 1,
					text : "walk the dog",
					completed : false,
					completedAt : null,
					createdAt : 500
				}, {
					id : 2,
					text : "clean the yard",
					completed : false,
					completedAt : null,
					createdAt : 500
				}];

			var store = configure({
				todos: todos
			});

			var provider = TestUtils.renderIntoDocument(
				<Provider store ={store}>
					<ConnectedTodoList />
				</Provider>)
			var todoList = TestUtils.scryRenderedComponentsWithType(provider, ConnectedTodoList)[0];
			// var todoList = TestUtils.renderIntoDocument(<TodoList todos={todos} />);
			var todoComponents = TestUtils.scryRenderedComponentsWithType(todoList, ConnectedTodoItem);

			expect(todoComponents.length).toBe(todos.length);
	});
});
