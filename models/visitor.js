//import { Schema as _Schema, model } from 'mongoose';
const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var visitorSchema = new Schema({
    ID : {
        type: String,
        required: true
    },
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
        match : `^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7} `,
        required: true
    }
});

module.exports = mongoose.model('Visitor', visitorSchema);
//export default model('Visitor', visitorSchema);