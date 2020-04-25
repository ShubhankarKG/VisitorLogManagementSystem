// import { Schema as _Schema, model } from 'mongoose';
const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
var adminSchema = new Schema({
	Email: String,
	Password: String,  /* TODO : Secure using password hash */
	IdNumber: Number
});

module.exports = model('Admin', adminSchema);