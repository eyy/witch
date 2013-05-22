require.config({
    paths: {
        jquery: 'lib/jquery/jquery',
        underscore: 'lib/underscore-amd/underscore',
        backbone: 'lib/backbone-amd/backbone'
    }
});

require(['jquery', 'lib/bootstrap/js/bootstrap']);

require(['views/app'], function(App) {
    new App;
});