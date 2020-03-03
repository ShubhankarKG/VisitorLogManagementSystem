import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var departmentSchema = new Schema({
    _id : Schema.Types.ObjectId,
    Name : String,
    HOD : String,
    FacultyNumber : Number
});

export default model('Department', departmentSchema);
