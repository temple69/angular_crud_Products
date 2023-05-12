const express = require("express");
const { CreateUser, loginUser } = require("../Controller/users.controller");
const router = express.Router();


router.post("/signup", CreateUser);
router.post("/login", loginUser);
module.exports = router;