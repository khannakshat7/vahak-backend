
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    parentid: {
        type: String
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Appointment = mongoose.model('Appointment',appointmentSchema);

module.exports = Appointment;

