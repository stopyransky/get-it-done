var expect = require('expect');
var df  = require('deep-freeze-strict');
var reducers = require('reducers');

describe("Reducers", () => {

	describe("searchTextReducer", () => {
		it('should set searchText', () => {
			var action = {
				type: "SET_SEARCH_TEXT",
				searchText : 'some search text'
			};

			var res = reducers.searchTextReducer(df(""), df(action));

			expect(res).toEqual(action.searchText);
		});
	});

	describe("showCompletedReducer", () => {
		it('should toggle showCompleted', () => {
			var action = {
				type: "TOGGLE_SHOW_COMPLETED"
			};

			var res = reducers.showCompletedReducer(df(false), df(action));

			expect(res).toEqual(true);
		});
	});

	describe("todosReducer", () => {

		it('should add new todo', () => {
			var action = {
				type: "ADD_TODO",
				todo : {
					id: '123',
					text : 'Something to do',
					completed : false,
					createdAt : 983453
				}
			};

			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(action.todo);
		});

		it('should add multiple todos', () => {
			var todos= [{
				id : "111",
				text : "anything",
				completed : false,
				completedAt : null,
				createdAt : 33000
			}];
			var action = {
				type: "ADD_TODOS",
				todos
			};

			var res = reducers.todosReducer(df([]), df(action));

			expect(res.length).toEqual(1);
			expect(res[0]).toEqual(todos[0]);
		});

		it('should toggle todo', () => {
			var todos = [ {
				id: "123",
				text : "something",
				completed : true,
				createdAt : 123,
				completedAt : 125
			}];

			var action = {
				type: "TOGGLE_TODO",
				id : "123"
			};

			var res = reducers.todosReducer(df(todos), df(action));

			expect(res[0].completed).toEqual(false);
			expect(res[0].completedAt).toEqual(null);
		});
	});

});
