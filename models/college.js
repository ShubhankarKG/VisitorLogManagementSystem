import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var collegeSchema = new Schema({
    Name : String,
    Description : Text,
    AICTE_Number : Number
});

export default model('College', collegeSchema);
