const mongoose = require('mongoose')

const loginSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    }
})

const User = mongoose.model('User', loginSchema)

module.exports = User