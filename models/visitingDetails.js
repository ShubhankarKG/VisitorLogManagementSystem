const mongoose = require('mongoose');
const addHours = require('date-fns/addHours');

const Schema = mongoose.Schema;

const addHour = () => {
    return addHours(Date.now(), 1);
};

var visitingDetailsSchema = new Schema({
    VisitorID : String,
    VisitorName : String,
    VisitorEmail: String,
    DateIn : Date,
    DateOut : Date,
    TimeIn : { type : Date, default : Date.now },
    TimeOut : { type : Date, default : Date.now },
    VehicleNumber : String,
    VisitingFaculty : String,
    Relation : String,
    Description : String,
    Place: String,
    Date: { type: Date, default: Date.now},
    Time: { type: Date, default: addHour}
});

module.exports = mongoose.model('VisitingDetails', visitingDetailsSchema);