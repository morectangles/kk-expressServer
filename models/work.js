const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    video: String,
    img: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

workSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Work', workSchema);