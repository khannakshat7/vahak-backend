
var authenticate = require('../authenticate');
const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const Prescription = require('../models/prescription');
var passport = require('passport');

const prescriptionRouter = express.Router();

prescriptionRouter.use(bodyParser.json());

// {userid : req.user._id}
prescriptionRouter.route('/')
    .post(authenticate.verifyUser, (req,res,next) => {
        req.body.userid = req.user._id;
        Prescription.create({
            userid: req.body.user,
            prescription: req.body.prescription
        })
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Prescription added succesfully'});
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

prescriptionRouter.route('/')
    .get(authenticate.verifyUser, (req,res,next) => {
        var userid;
        userid = req.user._id;

        Prescription.find({userid : userid})
        .then((locations) => {
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json');
            res.json({message : 'Sensor added succesfully', data : locations});
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




module.exports = prescriptionRouter;