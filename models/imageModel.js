var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var imageSchema = new Schema({
    username: String,
    title: String,
    imageLink: String,
    likes: Number,
    likedBy: []
});

var Images = mongoose.model("Images", imageSchema);

module.exports = Images;