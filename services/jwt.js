'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_servicio';

exports.createToken = function(user){
	var payload = {
		sub: user._id,
		name: user.name,
		surname1: user.surname1,
		surname2: user.surname2,
		school_number: user.school_number,
		role: user.role,
		iat: moment().unix(),
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};