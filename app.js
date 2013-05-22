var express = require('express'),
    http = require('http'),
    path = require('path'),
    stylus = require('stylus');

var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// stylus
if ('development' == app.get('env')) {
    app.use(stylus.middleware({
        force: true,
        src: path.join(__dirname, 'public')
    }));
}

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
