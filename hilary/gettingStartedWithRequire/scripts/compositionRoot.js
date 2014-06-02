// Using AMD, our modules registered with some of their dependencies already 
// resolved. That's a bit of mix-and-match, and you could avoid it by only 
// defining factories. Personally, I would go that route, but this example 
// assumes you are already steeped in AMD, so I'm going for a realistic scenario.

define('compositionRoot', ['hilary', 'mock-ajax', 'model', 'view', 'controller'], 
	function(hilary /*, mockAjax, myModel, myView, myController */) {
		"use strict";

		var _mockAjax, _controller;

		// resolve a mock jQuery ajax service
		// jQuery was already injected into it by require.js
		_mockAjax = hilary.resolve('mock-ajax')
			.makePromise([{ id: 1, name: 'Hilary Page' }, { id: 2, name: 'Ole Kirk Kristiansen' }], 40);

		// resolve myController and inject our _mockAjax singleton, 
		// model factory and view factory into it. In a non-test 
		// scenario, we would inject $.ajax instead of _mockAjax.
		_controller = function() {
			return hilary.resolve('myController')
				.call(null, 
					_mockAjax, 
					hilary.resolve('myModel').call(), 
					hilary.resolve('myView').call());
		};

		return {
			start: function() {
				_controller().view();
			}
		};
	});