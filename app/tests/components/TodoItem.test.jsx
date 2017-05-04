var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

var TodoItem = require('TodoItem');

describe("TodoItem", () => {
	it("should exist", () => {
		expect(TodoItem).toExist();
	});
});
