const Faculty = require("../models/faculty");
const mongoose = require("mongoose");

exports.faculty_retrieve = (req, res) => {
   Faculty.find({}, (err, faculties) => {
    if (err) console.log(err);
    //var facultyList = [];
    // Thumb rule: Avoid using var always. Use either const or let.
    // var has weird scoping rules which end up in runtime errors.
    const facultyList = faculties.map((faculty) => ({
        name: faculty["Name"], 
        id: faculty['_id'], 
        email: faculty['email'],
        username: faculty['username'],
    }));
    res.json(facultyList);
   })
};

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