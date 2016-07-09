// server.js

// modules
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');

// set our port
var port = process.env.PORT || 3000;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://etp12gym:etp12gym@ds019491.mlab.com:19491/etp12gym');

// set the static files location
app.use(express.static(__dirname + '/public'));

//bodyParser Middleware to allow different encoding requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());       // to support JSON-encoded bodies

//Routes API
var router = express.Router();
app.use('/', router);
require('./app/routes')(router); // configure our routes

// startup our app at http://localhost:3000
app.listen(port);


// expose app
exports = module.exports = app;
