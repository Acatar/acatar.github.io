// The ViewModel module contains the ViewModel(s), as well as 
// the logic for casting server Model(s) to ViewModel(s).
define('viewModel', function() {

	var ctor = function (ko) {
		var _self = {},
			viewModel,
			makeUser;

		// makes a new ViewModel
		viewModel = function() {
			var _self = {};

			_self.users = ko.observableArray([]);

			_self.addUser = function(user) {
				_self.users.push(makeUser(user));
			};

			return _self;
		};

		// makes a user ViewModel, with knockout-observable properties
		// @param data: the user Model (server model)
		makeUser = function(data) {
			var _self = {};

			_self.id = ko.observable(data.id);
			_self.name = ko.observable(data.name);

			return _self;
		};

		// casts a Model that contains an array of users to a new ViewModel
		_self.fromModel = function (data) {
			if (Object.prototype.toString.call(data) !== '[object Array]')
				throw Error('a users array was expected');

			var _viewModel = viewModel();
			
			for (var i in data) {
				_viewModel.addUser(data[i]);
			}

			return _viewModel;
		};

		return _self;
	};

	return {
		init: ctor
	};

});