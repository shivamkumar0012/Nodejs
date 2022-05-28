const mongoose = require('mongoose')

const model = mongoose.Schema({
    report_id: {
        type: String,
        required: true
    },
    pasanger_name: {
        type: String,
        required: true
    },
    pasanger_gender: {
        type: String,
        required: true
    },
    pasanger_age: {
        type: String,
        required: true
    },
    injury_type: {
        type: String,
        required: true
    },
    mobile_number: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    nomanee: {
        type: String,
        required: true
    },
    accident_reason: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("User", model)