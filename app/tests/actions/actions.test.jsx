import  configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');
// var actions = require('actions');
import * as actions from 'actions';
var createMockStore = configureMockStore([thunk]);

import firebase, {firebaseRef} from './../../firebase/index.js'
describe("Actions", () => {
	it('should generate search text action', () => {
		var action = {
			type: "SET_SEARCH_TEXT",
			searchText : 'some search text'
		};
		var res = actions.setSearchText(action.searchText);

		expect(res).toEqual(action);
	});

	it("should generate add todo action", () => {
		var action = {
			type: "ADD_TODO",
			todo : {
				id: '1235',
				text : "Thing to do",
				completed : false,
				createdAt : 0
			}
		};

		var res = actions.addTodo(action.todo);

		expect(res).toEqual(action);
	});

	it('should create todo and dispatch ADD_TODO', (done) => {

		const store = createMockStore({});
		const todoText = 'My todo item';

      	store.dispatch(actions.startAddTodo(todoText)).then(() => {
	        const actions = store.getActions();
			expect(actions).toExist();
	        expect(actions[0]).toInclude({type: 'ADD_TODO'});
	        expect(actions[0].todo).toInclude({text: todoText});
	        done();

	  	}).catch(done);
    });

	it("should generate add todos action object", () => {
			var todos= [{
				id : "111",
				text : "anything",
				completed : false,
				completedAt : null,
				createdAt : 33067600
			}];
			var action = {
				type: "ADD_TODOS",
				todos
			};

			var res = actions.addTodos(todos);

			expect(res).toEqual(action);
	});

	it("should generate toggle show completed action", () => {
		var action = {
			type: "TOGGLE_SHOW_COMPLETED"
		};

		var res = actions.toggleShowCompleted();

		expect(res).toEqual(action);
	});

	it("should generate update todo action", () => {
		var action = {
			type: "UPDATE_TODO",
			id : "123",
			updates : {  completed : false }
		};
		var res = actions.updateTodo(action.id, action.updates);

		expect(res).toEqual(action);
	});

	describe("Tests with Firebase todos", () => {

		var testTodoRef;

		beforeEach((done)=>{

			var todosRef = firebaseRef.child('todos');

			todosRef.remove().then(() => {
				testTodoRef = firebaseRef.child("todos").push();

				return testTodoRef.set({
					text: 'Something to do',
					completed : false,
					createdAt : 1245453
				})
			})
			.then(()=> done())
			.catch(done);


		});

		afterEach(() => {
			testTodoRef.remove().then(()=>done());
		});

		it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
	      const store = createMockStore({});
	      const action = actions.startToggleTodo(testTodoRef.key, true);

	      store.dispatch(action).then(() => {
	        const mockActions = store.getActions();

	        expect(mockActions[0]).toInclude({
	          type: 'UPDATE_TODO',
	          id: testTodoRef.key
	        });
	        expect(mockActions[0].updates).toInclude({
	          completed: true
	        });
	        expect(mockActions[0].updates.completedAt).toExist();

	        done();
	      }, done);
	    });

		it('should populate todos and dispatch ADD_TODOS', (done) => {
			const store = createMockStore({});
			const action = actions.startAddTodos();

			store.dispatch(action).then(()=>{
				const mockActions = store.getActions();

				expect(mockActions[0].type).toEqual('ADD_TODOS');
				expect(mockActions[0].todos.length).toEqual(1);
				expect(mockActions[0].todos[0].text).toEqual('Something to do')
				done();
			}).catch(done);
		});
	});
});
