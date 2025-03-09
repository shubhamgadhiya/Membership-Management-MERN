const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isMember: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model("user", userModel);