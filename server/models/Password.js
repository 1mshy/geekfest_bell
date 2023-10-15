const mongoose = require('mongoose');
//Make password Schema & Model from mongo database
const PasswordSchema = new mongoose.Schema({
    website: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Password = mongoose.model('password', PasswordSchema);

module.exports = Password;