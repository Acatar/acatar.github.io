(function ($, window, ko) {
    (function (factory) {                                              	// The factory: support module loading scenarios, such as require.js
        if (typeof define === 'function' && define.amd) {               // If a module loader, such as require.js, is present
            return define('compiler', ['jquery', 'knockout'], factory);	// Define and return the anonymous AMD module
        } 
        else {                                                        	// Otherwise, if a module loader is NOT present
			if (typeof grain === 'undefined') {							// If grain is undefined
        		window.grain = {};        								// Create the namespace
        	}

            return window.grain.compiler = factory($, ko);              // Add this module as a global variable, and return it
        }
    })(function($, ko) {
		var version = '1.1.0',
			compilerOptions = null;

		var viewModel = {
			path: '/source/',
			modules: ko.observableArray(),
			addModule: function(data) {
				this.modules.push(new module(data));
			}		
		}

		var module = function(data) {
			var $this = this;
			$this.name = ko.observable(data.name);
			$this.jsFile = ko.observable(data.jsFile);
			$this.dependencies = ko.observableArray(data.dependencies);

			$this.dependencyString = ko.computed(function() {
				var _dep = $this.dependencies();
				return _dep != null ? _dep.toString() : '';
			}, $this);

			return $this;
		}

		var minifiedOptions = {
			compilation_level: 'SIMPLE_OPTIMIZATIONS',
			output_format: 'json',
			output_info: 'compiled_code',
			output_file_name: 'grain.' + version + '.min.js'
		}

		var debugOptions = $.extend({}, minifiedOptions);
		debugOptions.compilation_level = 'WHITESPACE_ONLY';
		debugOptions.formatting = 'pretty_print'; //',print_input_delimiter';
		debugOptions.output_file_name = 'grain.js';

		var init = function(options) {
			// Add the require.js shim
			// viewModel.addModule({ name: 'grain require.js shim', jsFile: options.jsPath + 'grain.shims.require.js', dependencies: ['grain.js'] });			

			// Add core modules
			viewModel.addModule({ name: 'grain (core)', jsFile: options.jsPath + 'grain.js', dependencies: null });
			viewModel.addModule({ name: 'grain.string', jsFile: options.jsPath + 'grain.string.js', dependencies: ['grain.js'] });
			viewModel.addModule({ name: 'grain.array', jsFile: options.jsPath + 'grain.array.js', dependencies: ['grain.js'] });
			viewModel.addModule({ name: 'grain.date', jsFile: options.jsPath + 'grain.date.js', dependencies: ['grain.js'] });
			viewModel.addModule({ name: 'grain.reflection', jsFile: options.jsPath + 'grain.reflection.js', dependencies: ['grain.js'] });

			// Add the rest of the modules
			viewModel.addModule({ name: 'grain.ajax', jsFile: options.jsPath + 'grain.ajax.js', dependencies: ['grain.js', 'grain.string.js', 'grain.reflection.js'] });
			viewModel.addModule({ name: 'grain.cache', jsFile: options.jsPath + 'grain.cache.js', dependencies: ['grain.js', 'grain.string.js', 'grain.reflection.js'] });
			viewModel.addModule({ name: 'grain.formSubmitEvents', jsFile: options.jsPath + 'grain.formSubmitEvents.js', dependencies: ['grain.js', 'grain.string.js', 'grain.reflection.js', 'grain.ajax.js'] });
			viewModel.addModule({ name: 'grain.queryString', jsFile: options.jsPath + 'grain.queryString.js', dependencies: ['grain.js'] });
			viewModel.addModule({ name: 'grain.uri', jsFile: options.jsPath + 'grain.uri.js', dependencies: ['grain.js'] });
			viewModel.addModule({ name: 'grain.wait', jsFile: options.jsPath + 'grain.wait.js', dependencies: ['grain.js'] });
			viewModel.addModule({ name: 'grain.wizard', jsFile: options.jsPath + 'grain.wizard.js', dependencies: ['grain.js'] });
			
			// Add the shims
			viewModel.addModule({ name: 'grain Pascal Case shim', jsFile: options.jsPath + 'grain.shims.pascal.js', dependencies: ['grain.js'] });
		}

		var $compiler = {};

		$compiler.init = function(options) {
			options = options || {};
			options.jsPath = 'https://raw.github.com/Acatar/grain.js/master/source/';
			options.closurePath = 'http://closure-compiler.appspot.com';
			init(options);
			ko.applyBindings(viewModel, $('#moduleOptions')[0]);
			compilerOptions = options;
		}

		$compiler.compile = function(minify) {
			var _options = minify ? minifiedOptions : debugOptions;
			var _serialized = JSON.stringify(_options);

			var _params = $.param(_options);

			$('#moduleOptions .module:checked').each(function (n) { 
				// todo: enforce dependencies
				_params += '&' + $.param( {'code_url': $(this).val() } );
				//_options.code_url.push($(this).val());
			});

// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name default.js
// @formatting pretty_print,print_input_delimiter
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.string.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.array.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.date.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.reflection.js

// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.ajax.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.cache.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.formSubmitEvents.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.queryString.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.uri.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.wait.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.wizard.js
// @code_url https://raw.github.com/Acatar/grain.js/master/source/grain.shims.pascal.js
// ==/ClosureCompiler==


			$.ajax({ 
				url: compilerOptions.closurePath + '/compile?' + $.param(_options), 
				method: 'POST',
				//data: _options,
				//dataType: 'json'
			})
			.done(function(data){ 
				console.log('success', data); 
				window.location.href = compilerOptions.closurePath + data;
			}) // success
            .fail(function (jqXHR, status, errorThrown) {
                console.error(jqXHR);
                console.error(status);
                console.error(errorThrown);
            }); // error
		}

		return $compiler;
	});
})(window.jQuery, window, window.ko);