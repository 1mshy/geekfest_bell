const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PasswordSchema = new Schema({
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