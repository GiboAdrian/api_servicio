'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var work_routes = require('./routes/work');
var studies_routes = require('./routes/studies');

app.use(bodyParser.urlencoded({extend: false}));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app.use('/api', user_routes);
app.use('/api', work_routes);
app.use('/api', studies_routes);

module.exports = app;