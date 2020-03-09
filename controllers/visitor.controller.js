const Visitor = require('../models/visitor');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.MAIL_PASSWORD);
var transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : 'shubhankar.gupto.11@gmail.com',
        pass : ''
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
    let flag = 0;
    
    const mailOptions = {
        from : 'shubhankar.gupto.11@gmail.com',
        to : req.body.email,
        subject : 'Verify User',
        html : '<h1>Please enter the following passcode to continue</h1> <pre>653453</pre>'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
    })
    
    //res.redirect('/test');

    if (flag===1){
        visitor.save((err) => {
            if (err) console.log(err);
            else res.send('Visitor Added Succcessfully')
        });
    }
    else {
        res.send("<h2>Sorry, authentication failed</h2>");
    }
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