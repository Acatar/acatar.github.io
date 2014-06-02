define('mock-ajax', ['jquery'], function($) {
	var _defer, _promise, _realDefer, _realPromise;

    _defer = new $.Deferred();
	_promise = _defer.then(function (mockData) {
    	return mockData;
	});

	_realDefer = new $.Deferred();
	_realPromise = _realDefer.then(function(mockData, timeout) {
		setTimeout(function() {
			_defer.resolve(mockData);
		}, timeout);
	});

	hilary.register('mock-ajax', {
			makePromise: function (mockData, timeout) {
				return function(options) {
					_realDefer.resolve(mockData, timeout);
					return _promise;
				};
			}
		});
});