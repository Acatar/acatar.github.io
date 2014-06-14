"use strict";

// The view is how we interact with the DOM for things like 
// ViewModel binding, DOM manipulation and DOM event handling, like button clicks.
hilary.register('myView', { 
	// initializes the View
	// @param $: jQuery
	// @param ko: knockout.js
	init: function($, ko) {

		// binds a ViewModel to the DOM
		// @param viewModel: the ViewModel that will be bound to the DOM
		var bindModelToView = function(viewModel) {
			ko.applyBindings(viewModel, $('userExample')[0]);
		};
		
		return {
			bindTo: bindModelToView
		};
	} // /init
});