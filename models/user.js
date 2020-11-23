
var mongoose = require('mongoose');
const path=require('path');
const multer=require('multer');
const PATH=path.join('/uploads/reports/');

var Schema = mongoose.Schema;

var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    usertype: {
        type: String
    },
    parentid: {
        type: String
    },
    companyname: {
        type: String
    },
    name: {
        type: String
    },
    typeofdatabase: {
        type: String
    },
    companylogo: {
        type: String
    },
    userpic: {
        type: Object
    },
    reports:{
        type:Array,
        default:[]
    }
});

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
User.statics.upload=multer({storage:storage}).single('report');
User.statics.Path=PATH;
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',User);