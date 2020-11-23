const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    userid: {
        type: String,
        required: true
    },
    prescription: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Prescription = mongoose.model('Prescription',prescriptionSchema);

module.exports = Prescription;

