
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    sensorinstid: {
        type: String,
        required: true
    },
    reading: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

var Data = mongoose.model('Data',dataSchema);

module.exports = Data;

