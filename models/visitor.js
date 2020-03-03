import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var visitorSchema = new Schema({
    ID : String,
    VisitorName : String,
    Address : Text,
    Gender : String,
    Faculty : String,
    ContactNumber : Number,
    Description : Text
});

export default model('Visitor', visitorSchema);