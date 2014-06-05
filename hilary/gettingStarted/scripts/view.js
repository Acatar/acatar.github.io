hilary.register('myView', { init: function($, ko) {
	return {
		bindTo: function(model) {
			ko.applyBindings(model, $('userExample')[0]);
		}
	};
}});