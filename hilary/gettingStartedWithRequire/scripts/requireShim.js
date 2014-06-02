define('jquery', function(){ return window.jQuery; });
define('hilary', function(){ return window.hilary; });
define('ko', function(){ return window.ko; });

require.config({
    baseUrl: '/hilary/gettingStartedWithRequire/scripts'
    //paths: {
    //    'jQuery': ['linq.min'],
    //},
});