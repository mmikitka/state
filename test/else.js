/* global describe, it */
var assert = require("assert"),
	state = require("../lib/node/state"),
	setLogger = require("../lib/node/log").setLogger;

//var oldLogger = setLogger(console);

var model = new state.StateMachine("model");

var initial = new state.PseudoState("initial", model);

var choice = new state.PseudoState("choice", model, state.PseudoStateKind.Choice);
var junction = new state.PseudoState("junction", model, state.PseudoStateKind.Junction);

var finalState = new state.State("final", model);

initial.to(choice);
choice.to(junction).when(function (instance, message) { return !instance.hello }).effect(function (instance, message) { instance.hello = "hello"; });
choice.to(finalState).else();
junction.to(choice).when(function (instance, message) { return !instance.world }).effect(function (instance, message) { instance.world = "world"; });

var instance = new state.DictionaryInstance("instance");

model.initialise(instance);

describe("test/else.js", function () {
	it("Test should result in a completed state", function () {
		assert.equal(true, model.isComplete(instance));
	});

	it("Else from choice transition fired appropriately", function () {
		assert.equal("hello", instance.hello);
	});

	it("Else from junction transition fired appropriately", function () {
		assert.equal("world", instance.world);
	});
});

//setLogger(oldLogger);