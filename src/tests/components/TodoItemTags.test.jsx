var expect=require('expect');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var $ = require('jquery');

import * as actions from 'actions';
import {TodoItemTags} from 'TodoItemTags';

describe("TodoItemTags", () => {

	it("should exist", () => {
		expect(TodoItemTags).toExist();
	});

});