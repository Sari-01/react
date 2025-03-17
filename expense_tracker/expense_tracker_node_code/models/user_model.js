const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid')

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        default: () => `USR-${uuidv4().slice(0, 8)}`,
        required: true,
        unique: true
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
})

module.exports = mongoose.model('User', userSchema)