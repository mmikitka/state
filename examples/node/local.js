var state = require("../../lib/node/state");
var log = require("../../lib/node/log");

// send log messages, warnings and errors to the console
log.setLogger(console);

// create the state machine model elements
var model = new state.StateMachine("model");
var initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
var stateA = new state.State("stateA", model);
var initialA = new state.PseudoState("initialA", stateA, state.PseudoStateKind.Initial);
var stateAA = new state.State("stateAA", stateA);
var stateAB = new state.State("stateAB", stateA);

// create the state machine model transitions
initial.to(stateA);
initialA.to(stateAA);
stateA.to(stateAB, state.TransitionKind.Local).when(function(i, s) {return s === "move";});

// create a state machine instance
var instance = new state.DictionaryInstance("instance");

// initialise the model and instance
model.initialise(instance);

// send the machine instance a message for evaluation, this will trigger the transition from stateA to stateB
model.evaluate(instance, "move");
