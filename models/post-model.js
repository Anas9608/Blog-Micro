const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        unique: true,
        trim: true,
        required: [true, "post must have a title"]
    },
    body: {
        type: String,
        trim: true,
        required: [true, "post must have a body"]
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
