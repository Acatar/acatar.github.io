require(['jquery', 'ko', 'mock-ajax', 'viewModel', 'view', 'controller'], 
function( $,        ko,   mockCtor, viewModelCtor, viewCtor, controllerCtor) {
	"use strict";

	var mocker, ajax, viewModel, view, controller;

	mocker 		= mockCtor.init($);										// create a singleton mocker
	ajax 		= mocker.makePromise([									// create a mock jQuery ajax signature
		{ id: 1, name: 'Hilary Page' }, 
		{ id: 2, name: 'Ole Kirk Kristiansen' }], 
		40 /**/);
	viewModel 		= viewModelCtor.init(ko);							// create a singleton viewModel
	view 	   	= function() { return viewCtor.init($, ko); };			// create a parameterless view factory
	controller 	= controllerCtor.init(ajax, viewModel, view);			// create a singleton controller
	
	controller.action();												// call an action on the controller 
																		// (i.e. this would load the page content)
});