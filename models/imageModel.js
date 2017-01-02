var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema({
    username: String,
    imageLink: String,
    likes: Number
});

var Images = mongoose.model("Images", imageSchema);

module.exports = Images;