var expect=require('expect');
var React = require('react');
var { Provider} = require('react-redux');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var configureStore = require("store");
// var TodoList = require("TodoList");
import TodoList  from 'TodoList';
var TodoApp = require('TodoApp');

describe("TodoApp", () => {
	it("should exist", () => {
		expect(TodoApp).toExist();
	});

	it("should render TodoList", () => {
		var store = configureStore.configure();
		var provider = TestUtils.renderIntoDocument(<Provider store={store}><TodoApp/></Provider>);
		var todoApp = TestUtils.scryRenderedComponentsWithType(provider, TodoApp)[0];

		var todoList = TestUtils.scryRenderedComponentsWithType(todoApp, TodoList);

		expect(todoList.length).toEqual(1);
	});

	// it('should add todo to the todos state on handleAddTodo', ()=>{
	// 	var todoText = 'test text';
	// 	var todoApp = TestUtils.renderIntoDocument(<TodoApp />);

	// 	todoApp.setState({ todos : []});
	// 	todoApp.handleAddTodo(todoText);

	// 	expect(todoApp.state.todos[0].text).toBe(todoText);

	// 	expect(todoApp.state.todos[0].createdAt).toBeA('number');
	// });

	// it('should toggle completed value when handleToggle called ', () => {
	// 	var todoData = {
	// 		id : 11,
	// 		text : 'test features',
	// 		completed : false,
	// 		createdAt :16,
	// 		completedAt : null
	// 	}

	// 	var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
	// 	todoApp.setState({todos: [todoData]});

	// 	expect(todoApp.state.todos[0].completed).toBe(false);
	// 	todoApp.handleToggle(11);
	// 	expect(todoApp.state.todos[0].completed).toBe(true);

	// 	expect(todoApp.state.todos[0].completedAt).toBeA('number');
	// });
	// 	it('should toggle from completed to incompleted ', () => {
	// 	var todoData = {
	// 		id : 11,
	// 		text : 'test features',
	// 		completed : false,
	// 		createdAt :16,
	// 		completedAt : 123
	// 	}

	// 	var todoApp = TestUtils.renderIntoDocument(<TodoApp />);
	// 	todoApp.setState({todos: [todoData]});

	// 	expect(todoApp.state.todos[0].completed).toBe(false);
	// 	todoApp.handleToggle(11);
	// 	expect(todoApp.state.todos[0].completed).toBe(true);
	// 	expect(todoApp.state.todos[0].completedAt).toExist();
	// 	todoApp.handleToggle(11);
	// 	expect(todoApp.state.todos[0].completedAt).toNotExist();
	// });
});
