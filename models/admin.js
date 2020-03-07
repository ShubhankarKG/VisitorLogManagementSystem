import { Schema as _Schema, model } from 'mongoose';
import { bcrypt } from 'bcryptjs';

var Schema = _Schema;

var adminSchema = new Schema({
    Name : String,
    Password : String  /* TODO : Secure using password hash */
});

module.exports.hashPassword = (admin, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) console.log(err);
        else {
            bcrypt.hash(admin.Password, salt, (err, hash) => {
                if(err) console.log(err);
                else{
                    admin.Password = hash;
                    callback(admin);
                }
            });
        }
    });
};

export default model('Admin', adminSchema);
