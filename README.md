# state
Executable finite state machine for TypeScript and JavaScript.

[![Build Status](https://travis-ci.org/steelbreeze/delegate.svg?branch=master)](https://travis-ci.org/steelbreeze/delegate)
[![Code Climate](https://codeclimate.com/github/steelbreeze/state/badges/gpa.svg)](https://codeclimate.com/github/steelbreeze/state)
[![Issue Count](https://codeclimate.com/github/steelbreeze/state/badges/issue_count.svg)](https://codeclimate.com/github/steelbreeze/state)
[![Test Coverage](https://codeclimate.com/github/steelbreeze/state/badges/coverage.svg)](https://codeclimate.com/github/steelbreeze/state/coverage)


> **Notes:**
>
>@steelbreeze/state the new home for [state.js](https://github.com/steelbreeze/state.js) and the versioning restarts here from v1.0.0.
>
>This implementation supports node only, a browser implementation via Bower will be available shortly. 

If you like @steelbreeze/state, please star it...

## Install
```shell
npm i @steelbreeze/state
```

## Usage
The API is broken up into two distinct parts:
1. A set of classes that represent a state machine model (State, PseudoState, Region, Transition, etc.);
2. An interface to represent an instance of a state machine, which embodies the *active state configuration* of a state machine at runtime. This enables multiple instances adhering to the same state machine model. There are also a couple of implementations of the interface. 

### TypeScript
```typescript
import * as state from "@steelbreeze/state";

// send log messages, warnings and errors to the console
state.setLogger(console);

// create the state machine model elements
const model = new state.StateMachine("model");
const initial = new state.PseudoState("initial", model, state.PseudoStateKind.Initial);
const stateA = new state.State("stateA", model);
const stateB = new state.State("stateB", model);

// create the state machine model transitions
initial.to(stateA);
stateA.to(stateB).when((instance, message) => message === "move");

// create a state machine instance
let instance = new state.JSONInstance("instance");

// initialise the model and instance
model.initialise(instance);

// send the machine instance a message for evaluation, this will trigger the transition from stateA to stateB
model.evaluate(instance, "move");

console.log(instance.toJSON());
```
### Output
The output of the above code will be:
```shell
initialise model
initialise instance
instance enter model.default
instance enter model.default.initial
instance leave model.default.initial
instance enter model.default.stateA
instance evaluate message: move
instance leave model.default.stateA
instance enter model.default.stateB
{"name":"instance","children":[{"name":"default","children":[],"current":"stateB","lastKnownState":"stateB"}]}
```

## License
MIT License

Copyright (c) 2017 David Mesquita-Morris
