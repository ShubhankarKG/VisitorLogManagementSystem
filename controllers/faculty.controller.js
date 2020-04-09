const Faculty = require("../models/faculty");
const mongoose = require("mongoose");

exports.faculty_retrieve = (req, res) => {
   Faculty.find({}, (err, faculties) => {
    if (err) console.log(err);
    var facultyMap = {};
    faculties.forEach((faculty) => {
        facultyMap[faculty._id] = faculty;
    });
    JSON.stringify(facultyMap);
    res.json(facultyMap);
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

exports.faculty_submit = (req, res) => {
    /* TODO : Find ways to integrate faculty and visitor here */
}