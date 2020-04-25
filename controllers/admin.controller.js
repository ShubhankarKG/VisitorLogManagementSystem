const Admin = require('../models/admin');

exports.admin_register = (req, res) => {
    const { password } = req.body;
    req.body.password = passwordHash(password);
    const admin = new Admin(req.body);
    admin.save().then( res.send('Admin added successfully'));
}