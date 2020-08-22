'use strict'

var express = require('express');
var WorkController = require('../controllers/work');
var api = express.Router();
var md_auth = require('../middlewares/authenticated');

var multipart = require('connect-multiparty');

api.get('/work/:id', md_auth.ensureAuth, WorkController.getWork);
api.post('/work', md_auth.ensureAuth, WorkController.saveWork);
api.get('/works/:user?', md_auth.ensureAuth, WorkController.getWorks);
api.put('/work/:id', md_auth.ensureAuth, WorkController.updateWork);
api.delete('/work/:id', md_auth.ensureAuth, WorkController.deleteWork);

module.exports = api;