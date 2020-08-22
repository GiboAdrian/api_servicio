'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	school_number: Number,
	password: String,
	name: String,
	surname1: String,
	surname2: String,
	birthday: String,
	career: String,
	marital_status: String,
	address: String,
	phone: String,
	cellphone: String,
	email: String,
	facebook: String,
	twitter: String,
	role: String
});

module.exports = mongoose.model('User', UserSchema);