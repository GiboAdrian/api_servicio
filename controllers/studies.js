'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Studies = require('../models/studies');
var User = require('../models/user');

function getStudy(req, res){
	var studiesId = req.params.id;

	Studies.findById(studiesId).populate({path: 'user'}).exec((err, studies) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!studies){
				res.status(404).send({message: 'No existe el estudio'});
			}else{
				res.status(200).send({studies});
			}
		}
	});
}

function getStudies(req, res){
	var userId = req.params.user;

	if(!userId){
		//sacar todos los estudios
		var find = Studies.find({}).sort('school');
	}else{
		//sacar los estudios de un solo usuario
		var find = Studies.find({user: userId}).sort('school');
	}

	find.populate({path: 'user'}).exec((err, studies) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!studies){
				res.status(404).send({message: 'No hay estudios'});
			}else{
				res.status(200).send({studies});
			}
		}
	});
}

function saveStudy(req, res){
	var studies = new Studies();

	var params = req.body;
	studies.school = params.school;
	studies.address = params.address;
	studies.phone = params.phone;
	studies.title = params.title;
	studies.user = params.user;

	studies.save((err, studiesStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!studiesStored){
				res.status(404).send({message: 'No se ha guardado el estudio'});
			}else{
				res.status(200).send({studies: studiesStored});
			}
		}
	});
}

function updateStudy(req, res){
	var studiesId = req.params.id;
	var update = req.body;

	Studies.findByIdAndUpdate(studiesId, update, (err, studiesUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!studiesUpdated){
				res.status(404).send({message: 'No se ha actualizado el estudio'});
			}else{
				res.status(200).send({studiesUpdated});
			}
		}
	});
}

function deleteStudy(req, res){
	var studiesId = req.params.id;

	Studies.findByIdAndRemove(studiesId, (err, studiesRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el estudio'});
		}else{
			if(!studiesRemoved){
				res.status(404).send({message: 'El estudio no ha sido eliminado'});
			}else{
				res.status(200).send({studies: studiesRemoved});
			}
		}
	});
}

module.exports = {
	getStudy,
	saveStudy,
	getStudies,
	updateStudy,
	deleteStudy
};