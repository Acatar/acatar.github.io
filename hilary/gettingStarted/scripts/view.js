hilary.register('myViewCtor', function($, ko) {
	return {
		init: function(model) {
			ko.applyBindings(model, $('userExample')[0]);
		}
	};
});