import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var facultySchema = new Schema({
    Name : String,
    Department : {type : Schema.Types.ObjectId, ref : 'Department'},
    Designation : String,
    email : {
        type : String,
        match : `^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7} `
    }
});

export default model('Faculty', facultySchema);
 