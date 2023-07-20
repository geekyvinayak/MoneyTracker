const express = require("express");
const {login, signup, verify,welcome, update,addwallet,addTransaction} = require("../contollers/Controller");

// const getRooms = require("../contollers/Controller.js")
const router = express.Router();

// router.get("/getdata",getRoom);
router.get("/",welcome);

router.post("/login",login);
router.post("/login",login);
router.post("/addtransaction",addTransaction);
router.post("/signup",signup);
router.get("/update",update);


router.get("/verify",verify);
router.get("/addwallet",addwallet);

router.get("/loaderio-35be33660b3842463b46b4bbcbf8ef98/",(req,res)=>{res.send("loaderio-35be33660b3842463b46b4bbcbf8ef98")});
router.post("/loaderio-35be33660b3842463b46b4bbcbf8ef98/",(req,res)=>{res.send("loaderio-35be33660b3842463b46b4bbcbf8ef98")});



module.exports = router
