const mongoose = require('mongoose')

const model = mongoose.Schema({
    report_id: {
        type: String,
        required: true
    },
    vehicle_category: {
        type: String,
        required: true
    },
    hit_run: {
        type: String,
        required: true
    },
    vehicle_number: {
        type: String,
        required: true
    },
    vehicle_type: {
        type: String,
        required: true
    },
    drink: {
        type: String,
        required: true
    },
    cell_phone: {
        type: String,
        required: true
    },
    vehicle_Speed: {
        type: String,
        required: true
    },
    license_No: {
        type: String,
        required: true
    },
    license_issue_date: {
        type: String,
        required: true
    },
    license_expiry_date: {
        type: String,
        required: true
    }
    
});

module.exports = new mongoose.model("User", model)