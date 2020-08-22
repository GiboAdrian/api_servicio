'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudySchema = Schema({
	school: String,
	address: String,
	phone: String,
	title: String,
	user: { type: Schema.ObjectId, ref: 'User'} 
});

module.exports = mongoose.model('Studies', StudySchema);