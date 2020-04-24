const Visitor = require('../models/visitor');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const ejs = require('ejs');
dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail.com',
  // port : 587,
  // secure : true,
  auth: {
    user: 'shubhankar.gupto.11@gmail.com',
    pass: process.env.MAIL_PASSWORD
  }
});


exports.test = (req, res) => {
  res.send('Working!');
}

let visitor = null;
let facultyEmail = null;
let visitorName = null;
let address = null;
let gender = null;
let contactNumber = null;
let description = null;
let email = null;

exports.visitor_create = (req, res) => {
  visitor = new Visitor({
    VisitorName: req.body.firstName + " " + req.body.lastName,
    Address: req.body.address,
    Gender: req.body.gender,
    Faculty: mongoose.Types.ObjectId(req.body.facultyID),
    ContactNumber: req.body.contact,
    Description: req.body.description,
    email: req.body.email
  });

  // Retrieving data one block higher so that other controllers may use it
  facultyEmail = req.body.facultyEmail;
  visitorName = req.body.firstName + " " + req.body.lastName;
  address = req.body.address;
  gender = req.body.gender;
  contactNumber = req.body.contact;
  description = req.body.description;
  email = req.body.email;

  //Todo: Find a better otp generating function.
  const otp = Math.floor(Math.random() * 899999 + 100000);
  ejs.renderFile(__dirname + "/mail_confirmation.ejs", {
    name: req.body.firstName + " " + req.body.lastName,
    otp: otp,
  }, (err, data) => {
    if (err) console.log(err);
    else {
      const mailOptionsVisitor = {
        from: 'shubhankar.gupto.11@gmail.com',
        to: req.body.email,
        subject: 'Verify User',
        html: data,
      };

      transporter.sendMail(mailOptionsVisitor, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
      });
    }
  });
  res.json({ otp });
}

exports.visitor_validate = (req, res) => {
  if (visitor !== null) {
    visitor.save((err) => {
      if (err) {
        res.json({ info: "There was an internal error" });
      } else {
        res.json({ info: "Visitor successfully verified!" });
        ejs.renderFile(__dirname + "/faculty_visitor.ejs", {
          visitorName : visitorName,
          address : address,
          gender : gender,
          contactNumber : contactNumber,
          description : description,
          email : email
        }, (err, data) => {
          if (err) console.log(err);
          else {
            const mailOptionsVisitor = {
              from: 'shubhankar.gupto.11@gmail.com',
              to: facultyEmail,
              subject: 'A visitor wants to meet you',
              html: data,
            };

            transporter.sendMail(mailOptionsVisitor, (err, info) => {
              if (err) console.log(err);
              else console.log(info);
            });
          }
        });
      }
    })
    visitor === null;
  }
}

exports.visitor_details = (req, res) => {
  Visitor.findById(req.params._id, (err, visitor) => {
    if (err) console.log(err)
    else res.send(visitor);
  })
}

exports.visitor_update = (req, res) => {
  visitor.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, visitor) => {
    if (err) return next(err);
    res.send('Visitor updated.');
  })
}

exports.visitor_delete = (req, res) => {
  visitor.findByIdAndRemove(req.params.id, err => {
    if (err) return next(err);
    res.send('Deleted successfully');
  })
}