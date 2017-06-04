var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

// var TodoSearch = require('TodoSearch');
import {TodoSearch} from 'TodoSearch';
describe("TodoSearch", () => {
	it("should exist", () => {
		expect(TodoSearch).toExist();
	});

	it("should dispath SET_SEARCH_TEXT with entered input text", () => {

		var searchText = "Dog";
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);

		todoSearch.refs.searchText.value = searchText;
		TestUtils.Simulate.change(todoSearch.refs.searchText);
		var action = {
			type: "SET_SEARCH_TEXT",
			searchText
		}
		expect(spy).toHaveBeenCalledWith(action);
	});

	it("should dispatch TOGGLE_SHOW_COMPLETED with proper checked value", () => {
		var action = {
			type: "TOGGLE_SHOW_COMPLETED"
		}
		var spy = expect.createSpy();
		var todoSearch = TestUtils.renderIntoDocument(<TodoSearch dispatch={spy} />);

		todoSearch.refs.showCompleted.checked = true;
		TestUtils.Simulate.change(todoSearch.refs.showCompleted);

		expect(spy).toHaveBeenCalledWith(action);
	});
});