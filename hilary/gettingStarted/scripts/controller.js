hilary.register('myController', { init: function(ajax, model, view) {
	return {
		// get the model from the server and initialize the view with the model data
		view: function() {
			return ajax({
					url: 'foo/bar/12',
					method: 'GET' 
				})
				.done(function(data) {
					var _model = model.cast(data);
					view.bindTo(_model);
				});
		}
	};
}});