const Visitor = require('../models/visitor');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

var transporter = nodemailer.createTransport({
    service : 'Gmail',
    auth : {
        user : '',
        pass : ''
    }
});


exports.test = (req, res) => {
    res.send('Working!');
}

let visitor = null;

exports.visitor_create = (req, res) => {
    visitor = new Visitor({
        VisitorName : req.body.firstName +" "+ req.body.lastName,
        Address : req.body.address,
        Gender : req.body.gender,
        Faculty : mongoose.Types.ObjectId(req.body.objectId),
        ContactNumber : req.body.contact,
        Description : req.body.description,
        email : req.body.email
    });

    //Todo: Find a better otp generating function.
    const otp = Math.floor(Math.random() * 899999 + 100000);
    
    const mailOptionsVisitor = {
        from : '@gmail.com',
        to : req.body.email,
        subject : 'Verify User',
        html : `<h1>Please enter the following passcode to continue</h1> <pre>${otp}</pre>`
    };
    
    transporter.sendMail(mailOptionsVisitor, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
    });

    const mailOptionFaculty = {
        from: '@gmail.com',
        to: '',
        subject: 'Visitor',
        html: ''
    }

    transporter.sendMail(mailOptionFaculty, (err, info) => {
        if (err) console.log(err);
        else console.log(info);
    });

    res.json({otp});
}

exports.visitor_validate = (req, res) => {
    if(visitor !== null) {
        visitor.save((err) => {
            if(err) {
                res.json({info: "There was an internal error"});
            } else {
                res.json({info: "Visitor successfully verified!"});
            }
        });
        visitor === null;
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