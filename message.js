const mongoose = require('mongoose')

const MessageSchema = new mongoose.schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamps: true
})

const Message = mongoose.model('Message', MessageSchema)

module.exports = Message