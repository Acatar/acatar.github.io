// A mock ajax promise, to satisfy a really simple, happy path ajax request
define('mock-ajax', ['jquery'], function($) {

	var ctor = function ($) {
		var _defer, _promise, _realDefer, _realPromise, _self = {};

		// create the mock ajax promise, which will be returned to the caller
	    _defer = new $.Deferred();
		_promise = _defer.then(function (mockData) {
	    	return mockData;
		});

		// make a promise that will return a given data set, afteer a given timeout
		// @param mockData: a value that meets the signature of what would be returned by the server
		// @param timeout: the time, in milliseconds, to wait before returning the result.
		_self.makePromise = function (mockData, timeout) {
			return function(options) {
				setTimeout(function() {
					_defer.resolve(mockData);
				}, timeout);
				
				return _promise;
			};
		};

		return _self;
	};

	return {
		init: ctor
	};

});