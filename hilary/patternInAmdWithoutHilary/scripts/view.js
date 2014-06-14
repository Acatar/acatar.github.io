// The view is how we interact with the DOM for things like 
// ViewModel binding, DOM manipulation and DOM event handling, like button clicks.
define('view', function() {

	var ctor = function ($, ko) {
		var _self = {};

		// binds a ViewModel to the DOM
		// @param viewModel: the ViewModel that will be bound to the DOM
		_self.bindTo = function (viewModel) {
			ko.applyBindings(viewModel, $('userExample')[0]);
		};

		return _self;
	};

	return {
		init: ctor
	};

});