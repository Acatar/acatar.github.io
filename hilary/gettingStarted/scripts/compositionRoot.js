// hilary.use lets us pass in window dependencies, similar to the standard module pattern, 
// except that the dependencies and the function arguments that they resolve to are right next to each other
// the first argument is always the container, then the window dependencies are passed in, in order
// it's totally optional => you could use the standar module pattern, require.js, whatever you want.
hilary.use([hilary, jQuery, ko], function(cntr, hilary, $, ko) {
	"use strict";

	var _mockAjax, _controller;

	// resolve a mock jQuery ajax service
	// we also inject jQuery into the mock-ajax constructor (the first argument), 
	// as well as an array of users (which will be used to resolve the promise), and 40 which is the number 
	// of milliseconds we want the promise to wait before resolving
	_mockAjax = hilary.resolve('mock-ajax')
		.call(null, $)
		.makePromise([{ id: 1, name: 'Hilary Page' }, { id: 2, name: 'Ole Kirk Kristiansen' }], 40);

	// create a model factory that resolves myModel and injects knockout into it, when called
	hilary.register('myModel', function() {
		return hilary.resolve('myModelCtor')
			(ko);
	});

	// create a view factory that resolves myView and injects jQuery and knockout into it, when called
	hilary.register('myView', function() {
		return hilary.resolve('myViewCtor')
			($, ko);
	}); 

	// resolve myController and inject our _mockAjax singleton, model factory and view factory into it
	_controller = hilary.resolve('myController')
		.call(null, _mockAjax, 
			hilary.resolve('myModel').call(), 
			hilary.resolve('myView').call());

	// execute the controller
	// this would not normally be part of composition root, as the controller would be chosen by a route engine
	_controller.view();
});