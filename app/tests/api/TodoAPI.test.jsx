var expect=require('expect');
// var React = require('react');
// var ReactDOM = require('react-dom');
// var TestUtils = require('react-addons-test-utils');
// var $ = require('jquery');

var TodoAPI = require('TodoAPI');

describe("TodoAPI", () => {

	beforeEach(() => {
		localStorage.removeItem('todos');
	});
	
	it("should exist", () => {
		expect(TodoAPI).toExist();
	});

	describe("setTodos", () => {

		it("should set valid todos array", () => {
			var todos = [{
				id : 99,
				test: 'test all files',
				completed: false
			}];

			TodoAPI.setTodos(todos);

			var actualTodos = JSON.parse(localStorage.getItem("todos"));

			expect(actualTodos).toEqual(todos);

		});

		it("should not set invalid todos array", () => {
			var badTodos = { a : "b"};
			TodoAPI.setTodos(badTodos);

			expect(localStorage.getItem(badTodos)).toBe(null);
		});
	});

	describe("getTodos", () => {
		it("should return empty array for bad localStorage data", ()=>{
			var actualTodos = TodoAPI.getTodos();

			expect(actualTodos).toEqual([]);
		});

		it("should return todo if valid array in localStorage", () => {
			var todos = [{
				id : 99,
				test: 'test all files',
				completed: false
			}];

			localStorage.setItem("todos", JSON.stringify(todos));

			var actualTodos = TodoAPI.getTodos();

			expect(actualTodos).toEqual(todos);
		});
	});

	describe("filterTodos", () => {
		var todos = [{
			 	id : 1, 
			 	text : "other text here",
			 	completed : true
			},{
			 	id : 2, 
			 	text : "else text here",
			 	completed : false
			},{
			 	id : 3, 
			 	text : "this text here",
			 	completed : true
			},{
			 	id : 4, 
			 	text : "another text here",
			 	completed : true
			}
		];

		it('should return all items if showCompleted is true', ()=>{
			var filteredTodos = TodoAPI.filterTodos(todos, true,'');

			expect(filteredTodos.length).toBe(4);
		});

		it('should return only non-completed items if showCompleted is false', ()=>{
			var filteredTodos = TodoAPI.filterTodos(todos, false,'');

			expect(filteredTodos.length).toBe(1);
		});
		it('should return all items if searchText is empty', ()=>{
			var filteredTodos = TodoAPI.filterTodos(todos, true, '');
			
			// expect(filteredTodos.length).toBe(1); 
			expect(filteredTodos.length).toBe(4);
		});
		it('should return matching items if searchText is not empty', ()=>{
			var filteredTodos = TodoAPI.filterTodos(todos, true, 'this');
			
			// expect(filteredTodos.length).toBe(1); 
			expect(filteredTodos[0].id).toBe(3);
		});

		it('should sort by completed status', ()=>{
			var filteredTodos = TodoAPI.filterTodos(todos, true,'');

			expect(filteredTodos[0].completed).toBe(false);
		});
	});
});