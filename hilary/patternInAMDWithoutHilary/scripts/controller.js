// The Controller is concerned with taking action, communicating with the server, 
// and routing the server results into appropriate ViewModels and Views.
define('controller', function() {
	
	var ctor = function(ajax, viewModel, view) {
		var _self = {};

		// Gets a Model from the server, casts it to a ViewModel, and binds the ViewModel to the View
		// For instance, if this was a usersControler, the action might be getUser or postUser.
		_self.action = function() {
			return ajax({
				url: 'foo/bar/12',
				method: 'GET'
			}).done(function(data){
				var _viewModel, _view;
				
				_viewModel = viewModel.fromModel(data);	// cast the server data (the Model) to the ViewModel
				_view = view();							// get a new instance of the view, to make sure there 
														// isn't any residual data from previous visits
				
				_view.bindTo(_viewModel);				// instruct the view to bind the ViewModel to the DOM
			});
		};

		return _self;
	};

	return {
		init: ctor
	};

});