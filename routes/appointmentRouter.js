
var authenticate = require('../authenticate');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Appointment = require('../models/appointment');
var passport = require('passport');

const appointmentRouter = express.Router();

appointmentRouter.use(bodyParser.json());

// {userid : req.user._id}
appointmentRouter.route('/')
    .post(authenticate.verifyUser, (req,res,next) => {
        req.body.userid = req.user._id;
        Appointment.create({
            userid: req.user._id,
            parentid: req.user.parentid,
            from: req.body.from,
            to: req.body.to
        })
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Appointment added succesfully'});
        },
        (err) => {
            res.statusCode = 400;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Database Error'});
        })
        .catch((error) => {
            res.statusCode = 400;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Server Error'});
        });
    });

appointmentRouter.route('/')
    .get(authenticate.verifyUser, (req,res,next) => {
        var userid;
        userid = req.user._id;

    Appointment.find({parentid : userid})
        .then((appointments) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Sensor added succesfully', data : appointments});
        },(err) => {
            res.statusCode = 400;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Database Error'});
        })
        .catch((err) => {
            res.statusCode = 400;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Server Error'});
        });
    });




module.exports = appointmentRouter;