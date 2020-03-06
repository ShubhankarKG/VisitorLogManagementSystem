import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var visitingDetailsSchema = new Schema({
    VisitorID : String,
    VisitorName : String,
    DateIn : Date,
    DateOut : Date,
    TimeIn : { type : Date, default : Date.now },
    TimeOut : { type : Date, default : Date.now },
    GateIn : {
        type : Schema.Types.ObjectId,
        ref : 'Gate'
    } /* Populate with gate Schema */,
    GateOut : {
        type : Schema.Types.ObjectId,
        ref : 'Gate'
    } /* Populate with gate Schema */,
    VehicleNumber : String,
    VisitingFaculty : String,
    Relation : String,
    Description : Text
});

export default model('VisitingDetails', visitingDetailsSchema);