const axios = require("axios");

const Post = require("../models/Post");

const User = require("../models/User");

module.exports.insertPost = async (req, res) => {
    try {
        if (req.body) {
            let userData = await User.findById(req.user._id);
            if (userData) {
                req.body.created_by = userData.id;
                req.body.geolocation = "172.12.10";
                req.body.status = "active";
                try {
                    const response = await axios.get("https://ipinfo.io/json");
                    const [latitude, longitude] = response.data.loc.split(",");
                    locationObj = {
                        latitude: latitude,
                        longitude: longitude,
                    };
                    req.body.geolocation = locationObj;
                    let newPost = await Post.create(req.body);
                    if (newPost) {
                        return res.status(200).json({
                            msg: "Post inserted successfully",
                            postData: newPost,
                            status: 1,
                        });
                    } else {
                        return res
                            .status(200)
                            .json({ msg: "Post not added", status: 0 });
                    }
                } catch (error) {
                    return res.status(200).json({
                        msg: "Error fetching user location:",
                        status: 0,
                    });
                }
            } else {
                return res
                    .status(200)
                    .json({ msg: "User not found", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Invalid Data", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.viewAllPost = async (req, res) => {
    try {
        let postData = await Post.find({ created_by: req.user._id });
        if (postData != "") {
            return res.status(200).json({
                msg: "Here is all post data",
                postData: postData,
                status: 1,
            });
        } else {
            return res.status(200).json({ msg: "No post found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.editPost = async (req, res) => {
    try {
        if (req.body) {
            let postData = await Post.findById(req.query.id);
            if (postData) {
                let editPost = await Post.findByIdAndUpdate(
                    req.query.id,
                    req.body
                );
                if (editPost) {
                    let newData = await Post.findById(req.query.id);
                    return res.status(200).json({
                        msg: "Here is new post data",
                        newData: newData,
                        status: 1,
                    });
                } else {
                    return res
                        .status(200)
                        .json({ msg: "Post not update", status: 0 });
                }
            } else {
                return res
                    .status(200)
                    .json({ msg: "post not found", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Invalid Data", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.deletePost = async (req, res) => {
    try {
        let postData = await Post.findById(req.query.id);
        if (postData) {
            let deletePostData = await Post.findByIdAndDelete(req.query.id);
            if (deletePostData) {
                return res
                    .status(200)
                    .json({
                        msg: "Post deleted",
                        deletePostData: deletePostData,
                        status: 1,
                    });
            } else {
                return res
                    .status(200)
                    .json({ msg: "Post not deleted", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Post not found", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};
