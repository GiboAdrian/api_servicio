'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Work = require('../models/work');
var User = require('../models/user');

function getWork(req, res){
	var workId = req.params.id;

	Work.findById(workId).populate({path: 'user'}).exec((err, work) => {
		if(err){
			res.status(500).send({message: 'Error en la peticion'});
		}else{
			if(!work){
				res.status(404).send({message: 'No existe el trabajo'});
			}else{
				res.status(200).send({work});
			}
		}
	});
}

function getWorks(req, res){
	var userId = req.params.user;

	if(!userId){
		//sacar todos los trabajos
		var find = Work.find({}).sort('company');
	}else{
		//sacar los trabajos de un solo usuario
		var find = Work.find({user: userId}).sort('years_working');
	}

	find.populate({path: 'user'}).exec((err, works) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!works){
				res.status(404).send({message: 'No hay trabajos'});
			}else{
				res.status(200).send({works});
			}
		}
	});
}

function saveWork(req, res){
	var work = new Work();

	var params = req.body;
	work.company = params.company;
	work.job = params.job;
	work.address = params.address;
	work.phone = params.phone;
	work.years_working = params.years_working;
	work.boss = params.boss;
	work.user = params.user;

	work.save((err, workStored) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!workStored){
				res.status(404).send({message: 'No se ha guardado el trabajo'});
			}else{
				res.status(200).send({work: workStored});
			}
		}
	});
}

function updateWork(req, res){
	var workId = req.params.id;
	var update = req.body;

	Work.findByIdAndUpdate(workId, update, (err, workUpdated) => {
		if(err){
			res.status(500).send({message: 'Error en el servidor'});
		}else{
			if(!workUpdated){
				res.status(404).send({message: 'No se ha actualizado el trabajo'});
			}else{
				res.status(200).send({workUpdated});
			}
		}
	});
}

function deleteWork(req, res){
	var workId = req.params.id;

	Work.findByIdAndRemove(workId, (err, workRemoved) => {
		if(err){
			res.status(500).send({message: 'Error al eliminar el trabajo'});
		}else{
			if(!workRemoved){
				res.status(404).send({message: 'El trabajo no ha sido eliminado'});
			}else{
				res.status(200).send({work: workRemoved});
			}
		}
	});
}

module.exports = {
	getWork,
	saveWork,
	getWorks,
	updateWork,
	deleteWork
};