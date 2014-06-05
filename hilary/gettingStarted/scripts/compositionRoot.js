// hilary.use lets us pass in window dependencies, similar to the standard 
// module pattern, except that the dependencies and the function arguments 
// that they resolve to are right next to each other. 
//
// The first argument is always the container, then the window dependencies 
// are passed in, in order.
//
// hilary.use is optional. You could use a standard module pattern, 
// require.js, or whatever you want.

hilary.use([hilary, jQuery, ko, window], function(hilarysInnerContainer, hilary, $, ko, window) {
	"use strict";

	var _mockAjax, _controller;

	// Resolve a mock jQuery ajax service.
	// We inject the "mock-ajax" service with a jQuery instance. Then we 
	// make a fake promise that will be used instead of real ajax.
	_mockAjax = hilary.resolve('mock-ajax')
		.init($)
		.makePromise([{ id: 1, name: 'Hilary Page' }, { id: 2, name: 'Ole Kirk Kristiansen' }], 40);

	// Resolve myController and inject our _mockAjax singleton, 
	// an instance of the model factory and an instance of the 
	// view factory into it.
	// In a non-test scenario, we would inject $.ajax instead of _mockAjax
	_controller = hilary.resolve('myController')
		.init(_mockAjax, 
			hilary.resolve('myModel').init(ko), 
			hilary.resolve('myView').init($, ko));

	window.example = {
		load: function() {
			_controller.view();
		}
	};	
});