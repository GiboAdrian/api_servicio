'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StatusSchema = Schema({
	residences: String,
	social_service: String,
	english: String,
	graduated: String,
	academic_credits: String,
	sports_credits: String,
	cultural_credits: String,
	user: { type: Schema.ObjectId, ref: 'User'} 
});

module.exports = mongoose.model('Status', StatusSchema);