import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var visitingDetailsSchema = new Schema({
    _id : Schema.Types.ObjectId,
    VisitorID : String,
    VisitorName : String,
    DateIn : Date,
    DateOut : Date,
    TimeIn : Date,
    TimeOut : Date,
    GateIn : Number /* Populate with gate Schema */,
    GateOut : Number,
    VehicleNumber : String,
    VisitingFaculty : String,
    Relation : String,
    Description : Text
});

export default model('VisitingDetails', visitingDetailsSchema);