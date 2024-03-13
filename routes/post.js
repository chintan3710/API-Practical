const express = require("express");

const postContoller = require("../controllers/postContoller");

const Passport = require("passport");

const routes = express.Router();

routes.post(
    "/insertPost",
    Passport.authenticate("userVerify", { failureRedirect: "/failLogin" }),
    postContoller.insertPost
);

routes.get(
    "/viewAllPost",
    Passport.authenticate("userVerify", { failureRedirect: "/failLogin" }),
    postContoller.viewAllPost
);

routes.post(
    "/editPost",
    Passport.authenticate("userVerify", { failureRedirect: "/failLogin" }),
    postContoller.editPost
);

routes.get(
    "/deletePost",
    Passport.authenticate("userVerify", { failureRedirect: "/failLogin" }),
    postContoller.deletePost
);

module.exports = routes;
