define('jquery', function(){ return window.jQuery; });
define('ko', function(){ return window.ko; });

require.config({
    baseUrl: '/hilary/patternInAmdWithoutHilary/scripts'
    //paths: {
    //    'jQuery': ['linq.min'],
    //},
});