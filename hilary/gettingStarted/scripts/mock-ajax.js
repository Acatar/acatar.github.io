"use strict";

// A mock ajax promise, to satisfy a really simple, happy path ajax request
hilary.register('mock-ajax', { 
	// initializes mock ajax
	// @param $: jQuery
	init: function($) {

	    var _defer, _promise, makePromise;

	    // create the mock ajax promise, which will be returned to the caller
	    _defer = new $.Deferred();
		_promise = _defer.then(function (mockData) {
	    	return mockData;
		});

		// make a promise that will return a given data set, afteer a given timeout
		// @param mockData: a value that meets the signature of what would be returned by the server
		// @param timeout: the time, in milliseconds, to wait before returning the result.
		makePromise = function (mockData, timeout) {
			return function(options) {
				setTimeout(function() {
					_defer.resolve(mockData);
				}, timeout);
				return _promise;
			};
		};

		return {
			makePromise: makePromise
		};

	} // /init
});