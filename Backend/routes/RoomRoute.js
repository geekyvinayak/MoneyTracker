const express = require("express");
const {login, signup, verify} = require("../contollers/RoomController");

// const getRooms = require("../contollers/RoomController.js")
const router = express.Router();

// router.get("/getdata",getRoom);
router.post("/login",login);

router.post("/verify",verify);

router.post("/createuser",signup);

module.exports = router