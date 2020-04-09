const Faculty = require("../models/faculty");
const mongoose = require("mongoose");

exports.faculty_retrieve = (req, res) => {
   Faculty.find({}, (err, faculties) => {
    if (err) console.log(err);
    var facultyList = [];
    faculties.forEach((faculty) => {
        console.log(faculty["Name"]);
        console.log(faculty["_id"]);
        facultyList.push(faculty["Name"]);
    });
    // facultyMap = {
    //     data : facultyList,
    // }
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

exports.faculty_submit = (req, res) => {
    /* TODO : Find ways to integrate faculty and visitor here */
}