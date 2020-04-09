const Faculty = require("../models/faculty");
const mongoose = require("mongoose");

exports.faculty_create = (req, res) => {
    console.log(req.body);
    let faculty = new Faculty({
        Name : req.body.firstName +" "+ req.body.lastName,
        Designation : req.body.designation,
        Department : mongoose.Types.ObjectId(req.body.objectId),
        email : req.body.email
    });

    faculty.save((err) => {
        if (err) console.log(err);
        else res.send("Faculty added successfully");
    });
};