'use strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');

function pruebas(req, res){
	res.status(200).send({
		message: 'Probando una accion del controlador de usuarios del api rest con node y mongo :D'
	});
}

function saveUser(req, res){
	var user = new User();

	var params = req.body;

	console.log(params);

	user.school_number = params.school_number;
	user.password = params.password;
	user.name = params.name;
	user.surname1 = params.surname1;
	user.surname2 = params.surname2;
	user.birthday = params.birthday;
	user.career = params.career;
	user.marital_status = params.marital_status;
	user.address = params.address;
	user.phone = params.phone;
	user.cellphone = params.cellphone;
	user.email = params.email;
	user.facebook = params.facebook;
	user.twitter = params.twitter;
	user.role = 'ROLE_ADMIN';

	if(params.password){
		//encriptar contraseña
		bcrypt.hash(params.password, null, null, function(err, hash) {
			user.password = hash;
			if(user.school_number != null && user.name != null && user.surname1 != null && user.surname2 != null && user.career != null){
				//guardar el usuario
				user.save((err, userStored) => {
					if(err){
						res.status(500).send({message: 'Error al guardar el usuario'});
					}else{
						if(!userStored){
							res.status(404).send({message: 'No se ha registrado el usuario'});
						}else{
							res.status(200).send({user: userStored});
						}
					}
				});
			}else{
				res.status(200).send({message: 'Rellena todos los campos'});
			}
		});
	}else{
		res.status(200).send({message: 'Introduce la contraseña'});
	}
}

function loginUser(req, res){
	var params = req.body;

	var school_number = params.school_number;
	var password = params.password;

	User.findOne({school_number: school_number}, (err, user) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!user){
				res.status(404).send({message: 'El usuario no existe'});
			}else{
				//comprobar la contraseña
				bcrypt.compare(password, user.password, function(err, check){
					if(check){
						//Devolver los datos del usuario logueado
						if(params.gethash){
							//devolver un token de jwt
							res.status(200).send({
								token: jwt.createToken(user)
							});
						}else{
							res.status(200).send({user});
						}
					}else{
						res.status(404).send({message: 'El usuario no ha podido loguearse'});		
					}
				});
			}
		}
	});
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;

	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(500).send({message: 'Error al actualizar el usuario'});
		}else{
			if(!userUpdated){
				res.status(404).send({message: 'No se ha podido actualizar el usuario'});
			}else{
				res.status(200).send({user: userUpdated});
			}
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser
};