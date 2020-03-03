import { Schema as _Schema, model } from 'mongoose';

var Schema = _Schema;

var adminSchema = new Schema({
    _id : Schema.Types.ObjectId,
    Name : String,
    Password : String  /* TODO : Secure using password hash */
});

export default model('Admin', adminSchema);
