const mongoose = require('mongoose')

const imageSchema = mongoose.Schema(
    {
        image:{
            type: String,
            required: true
        },
        // position: {
        //     type: String,
        //     required: true
        // },
        datetime: {
            type: String,
            required: true
        }
    }
);


module.exports = mongoose.model("Images",imageSchema)