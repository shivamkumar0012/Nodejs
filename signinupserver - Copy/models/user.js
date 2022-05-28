const mongoose = require('mongoose')

const model = mongoose.Schema({
    hid: {
        type: String,
        required: true,
        unique: true
    },
    hname: {
        type: String,
        required: true
    },
    hphoneno: {
        type: String,
        required: true,
        unique: true
    },
    haddress: {
        type: String,
        required: true
    },
    hcapacity: {
        type: String,
        required: true
    },
    htype: {
        type: String,
        required: true
    }
});

module.exports = new mongoose.model("User", model)