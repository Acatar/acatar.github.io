define('view', ['hilary'], function(hilary) {
	hilary.register('myView', function() {
			return { 
				init: function(model) {
					ko.applyBindings(model, $('userExample')[0]);
				}
			};
		});
});