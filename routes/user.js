const express = require("express");

const userController = require("../controllers/userController");

const routes = express.Router();

routes.post("/registerUser", userController.registerUser);

routes.post("/loginUser", userController.loginUser);

routes.post("/failLogin", async (req, res) => {
    return res.status(400).json({ msg: "User not login", status: 0 });
});

module.exports = routes;
