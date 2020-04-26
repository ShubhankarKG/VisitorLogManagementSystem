// import { Schema as _Schema, model } from 'mongoose';
const _Schema = require("mongoose").Schema;
const model = require("mongoose").model;

var Schema = _Schema;

var facultySchema = new Schema({
    Name: String,
    Department: String,
    Designation: String,
    email: {
        type: String,
    },
});

module.exports = model('Faculty', facultySchema);