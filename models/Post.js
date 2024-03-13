const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    created_by: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    geolocation: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
