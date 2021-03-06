define('model', ['hilary', 'ko'], function(hilary, ko) {
	"use strict";
	var makeUser = function(data) {
			var _self = {};

			_self.id = ko.observable(data.id);
			_self.name = ko.observable(data.name);

			return _self;
		};

	hilary.register('myModel', function() {
		return { 
			init: function (data) {
				if (Object.prototype.toString.call(data) !== '[object Array]')
					throw Error('a users array was expected');

				var _users = { users: [] };
				
				for (var i in data) {
					_users.users.push(makeUser(data[i]));
				}

				return _users;
			}
		};
	});
});