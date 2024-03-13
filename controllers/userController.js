const User = require("../models/User");

const bcrypt = require("bcrypt");

const jwtData = require("jsonwebtoken");

module.exports.registerUser = async (req, res) => {
    try {
        let checkmail = await User.findOne({ email: req.body.email });
        if (checkmail) {
            return res
                .status(200)
                .json({ msg: "Email already exist", status: 0 });
        } else {
            if (req.body.password == req.body.c_password) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
                let userData = await User.create(req.body);
                if (userData) {
                    return res
                        .status(200)
                        .json({ msg: "User register successfully", status: 1 });
                } else {
                    return res
                        .status(200)
                        .json({ msg: "User not registered", status: 0 });
                }
            } else {
                return res
                    .status(200)
                    .json({ msg: "Password not match", status: 0 });
            }
        }
    } catch (err) {
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        if (req.body) {
            let checkmail = await User.findOne({ email: req.body.email });
            if (checkmail) {
                if (
                    await bcrypt.compare(req.body.password, checkmail.password)
                ) {
                    let token = jwtData.sign({ userData: checkmail }, "JWTPR", {
                        expiresIn: "1h",
                    });
                    return res.status(200).json({
                        msg: "Login successfully",
                        loginToken: token,
                        status: 1,
                    });
                } else {
                    return res
                        .status(200)
                        .json({ msg: "Invalid password", status: 0 });
                }
            } else {
                return res
                    .status(200)
                    .json({ msg: "Email not match", status: 0 });
            }
        } else {
            return res.status(200).json({ msg: "Invalid data", status: 0 });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ msg: "Something went wrong", status: 0 });
    }
};