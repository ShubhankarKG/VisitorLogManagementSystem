// import { Schema as _Schema, model } from 'mongoose';
const _Schema = require("mongoose").Schema;
const model = require("mongoose").model;

var Schema = _Schema;

var facultySchema = new Schema({
    Name: String,
    Department: { type: Schema.Types.ObjectId, ref: 'Department' },
    Designation: String,
    email: {
        type: String,
        // match: /^[a-zA-Z0-9_+&*-] + (?:\\.[a-zA-Z0-9_+&*-]+ )*@(?:[a-zA-Z0-9-]+\\.) + [a-zA-Z]{2, 7}/
    }
});

// export default model('Faculty', facultySchema);
module.exports = model('Faculty', facultySchema);