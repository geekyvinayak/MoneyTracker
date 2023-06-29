const express = require("express");
const {login, signup, verify,welcome, update} = require("../contollers/RoomController");

// const getRooms = require("../contollers/RoomController.js")
const router = express.Router();

// router.get("/getdata",getRoom);
router.get("/",welcome);

router.post("/login",login);
router.post("/signup",signup);
router.get("/update",update);


router.get("/verify",verify);


module.exports = router