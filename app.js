var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();

// all environments
app.set('port', 80);
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname)));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// database
mongoose.connect('mongodb://localhost/witch');
var Item = mongoose.model('items', {
    name: String,
    color: Number
});
Item.resors = { allow: [ 'get', 'post', 'put', 'delete' ] };
app.use('/api', require('resors').middleware());

// listen
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
