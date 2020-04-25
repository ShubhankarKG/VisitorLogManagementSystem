//import { Schema as _Schema, model } from 'mongoose';
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
    VisitorName : { 
        type: String,
        required: true
    },
    Address : String,
    Gender : String,
    Faculty : {
        type : Schema.Types.ObjectId,
        ref : 'Faculty'
    },
    ContactNumber : Number,
    Description : String,
    email : {
        type : String,
        required: true
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);