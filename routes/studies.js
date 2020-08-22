'use strict'

var express = require('express');
var StudiesController = require('../controllers/studies');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/study/:id', md_auth.ensureAuth, StudiesController.getStudy);
api.post('/study', md_auth.ensureAuth, StudiesController.saveStudy);
api.get('/studies/:user?', md_auth.ensureAuth, StudiesController.getStudies);
api.put('/study/:id', md_auth.ensureAuth, StudiesController.updateStudy);
api.delete('/study/:id', md_auth.ensureAuth, StudiesController.deleteStudy);

module.exports = api;