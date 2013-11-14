requirejs.config({
    //appDir: ".",
    baseUrl: "/grainjs/scripts",
    paths: { 
        'jquery': ['http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.0.3.min'],
        'bootstrap': ['http://ajax.aspnetcdn.com/ajax/bootstrap/3.0.0/bootstrap.min'],
        'knockout': ['http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.2.1.debug']
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap' : ['jquery'],
        'knockout' : ['jquery']
    }
});