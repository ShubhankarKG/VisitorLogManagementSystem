import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var gateSchema = new Schema({
    _id : Schema.Types.ObjectId,
    GateNumber : Number,
    Description : Text
});

export default model('Gate', gateSchema);
