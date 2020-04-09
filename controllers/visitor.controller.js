const Visitor = require('../models/visitor');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const ejs = require('ejs');

dotenv.config();
console.log(process.env.MAIL_PASSWORD);
var transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'shubhankar.gupto.11@gmail.com',
        pass : 'carmelconvent'
    }
});


exports.test = (req, res) => {
    res.send('Working!');
}

exports.visitor_create = (req, res) => {
    console.log(req.body);
    let visitor = new Visitor({
        VisitorName : req.body.firstName +" "+ req.body.lastName,
        Address : req.body.address,
        Gender : req.body.gender,
        Faculty : mongoose.Types.ObjectId(req.body.objectId),
        ContactNumber : req.body.contact,
        Description : req.body.description,
        email : req.body.email
    });
    
    ejs.renderFile( + "../mail_confirmation.ejs", {name : req.body.firstName + " " + req.body.lastName}, (err, data) => {
        if (err) console.log(err);
        else {
            const mailOptions = {
                from : 'shubhankar.gupto.11@gmail.com',
                to : req.body.email,
                subject : 'Account Verified',
                html : data
            };
            
            transporter.sendMail(mailOptions, (err, info) => {
                if (err) console.log(err);
                else console.log(info);
            })
        }
    });
    visitor.save((err) => {
        if (err) console.log(err);
        else res.send('Visitor Added Succcessfully')
    });
}

exports.visitor_details = (req, res) => {
    Visitor.findById(req.params._id , (err, visitor) => {
        if (err) console.log(err)
        else res.send(visitor);
    })
}

exports.visitor_update = (req, res) => {
    visitor.findByIdAndUpdate(req.params.id, {$set:req.body}, (err, visitor) => {
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