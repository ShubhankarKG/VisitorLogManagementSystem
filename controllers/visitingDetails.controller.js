const VisitingDetails = require("../models/visitingDetails");
const mongoose = require("mongoose");
const ejs = require("ejs");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail.com",
  // port : 587,
  // secure : true,
  auth: {
    user: "shubhankar.gupto.11@gmail.com",
    pass: process.env.MAIL_PASSWORD,
  },
});

const months = [' January', ' February', ' March', ' April', ' May', ' June', 
                ' July', ' August', ' September', ' October', ' November', ' December'];

const getTime = (date) => {
  let hour = date.getHours();
  let ampm = " AM";
  let minute = date.getMinutes();
  if(hour < 10) {
    hour = "0" + hour.toString();
  }
  if(minute < 10) {
    minute = "0" + minute.toString();
  }
  if(hour > 12) {
    hour = "0" + (hour - 12).toString();
    ampm = " PM";
  }
  return (hour + ":" + minute + ampm);
}

const getDate = (_date) => {
    let date = _date.getDate();
    if(date % 10 === 1) {
        date = date.toString() + 'st';
    } else if(date % 10 === 2) {
        date = date.toString() + 'nd';
    } else if(date % 10 === 3) {
        date = date.toString() + 'rd';
    } else {
        date = date.toString() + 'th';
    }
    return (date + months[_date.getMonth()]);
    
}

exports.retrieve_details = (req, res) => {
    VisitingDetails.find({VisitingFaculty: req.params.user}, (err, visitingDetails) => {
        if(err) console.log(err);
        res.json(visitingDetails);
    })
}

exports.update_details = (req, res) => {
    console.log(typeof req.body.Date)
    VisitingDetails.updateOne({_id: req.body._id}, 
    {
        Date: req.body.Date, 
        Time: req.body.Time, 
        Place: req.body.Place
    }, (err, result) => {
        console.log(result);
        if(err) {
            console.log(err);
            res.json({ info: 'failure'});
        }
        res.json({ info: 'success'});
    })
}

exports.send_email = (req, res) => {
    ejs.renderFile(
    __dirname + "/time_place.ejs",
    {
        time: getTime(new Date(req.body.Time)),
        date: getDate(new Date(req.body.Date)),
        place: req.body.Place,
    },
    (err, data) => {
      if (err) console.log(err);
      else {
        const mailOptionsVisitor = {
          from: "shubhankar.gupto.11@gmail.com",
          to: req.body.VisitorEmail,
          subject: "Time and Place of meeting",
          html: data,
        };

        transporter.sendMail(mailOptionsVisitor, (err, info) => {
          if (err){
            console.log(err);
            res.json({ info: 'failure'})
          } 
          else {
            console.log(info);
            res.json({ info: 'success'});
          }
        });
      }
    }
  );
}