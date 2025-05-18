const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: [true, "user name is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;