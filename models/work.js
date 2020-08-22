'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WorkSchema = Schema({
	company: String,
	job: String,
	address: String,
	phone: String,
	years_working: Number,
	boss: String,
	user: { type: Schema.ObjectId, ref: 'User'} 
});

module.exports = mongoose.model('Work', WorkSchema);