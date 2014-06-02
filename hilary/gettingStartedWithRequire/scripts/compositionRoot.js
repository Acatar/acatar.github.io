require(['hilary', 'mock-ajax', 'model', 'view', 'controller'], 
	function(hilary, mockAjax, myModel, myView, myController) {
		"use strict";

		var _mockAjax, _model, _view, _controller;

		// resolve a mock jQuery ajax service
		_mockAjax = hilary.resolve('mock-ajax')
			.makePromise([{ id: 1, name: 'Hilary Page' }, { id: 2, name: 'Ole Kirk Kristiansen' }], 40);

		// resolve myController and inject our _mockAjax singleton, model factory and view factory
		_controller = hilary.resolve('myController')
			(_mockAjax, hilary.resolve('myModel').call(), hilary.resolve('myView').call());

		// execute the controller
		// this would not normally be part of composition root, as the controller would be chosen by a route engine
		_controller.view();
	});