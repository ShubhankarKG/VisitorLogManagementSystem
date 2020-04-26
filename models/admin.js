// import { Schema as _Schema, model } from 'mongoose';
const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
var adminSchema = new Schema({
	Email: String, 
	IdNumber: Number,
	Password: {
		type : String,
		maxlength : 80
	}
});

module.exports = model('Admin', adminSchema);