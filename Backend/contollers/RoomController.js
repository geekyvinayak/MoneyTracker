const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports.welcome = async (req, res) => {
  res.send("Welcome to Money tracker");
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user === null) {
    res.send("notfound");
  } else {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const userdata = {
        firstName: user.firstName,
        lastName: user.lastName,
        monthCycle: user.monthCycle,
        monthlyBudget : user.monthlyBudget
      };
      const token = jwt.sign(
        {
          email: email,
        },
        "MoneyTrackerjwtencryption@1200",
        { expiresIn: "12h" }
      );
      res.send({ stat: "sucess", token: token, userdata: userdata });
    } else {
      res.send({ stat: "fail" });
    }
  }
};

module.exports.signup = async (req, res) => {
  let data = req.body;
  const { email, password } = data;
  const saltRounds = 10;
  const myPlaintextPassword = password;
  const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
  data.password = hashedPassword;

  const user = await UserModel.findOne({ email: email });
  if (user === null) {
    UserModel.create(data)
      .then((data) => {
        res.status(201).send("created");
      })
      .catch((err) => {
        res.send(err);
      });
  } else {
    res.send("already exist");
  }
};

module.exports.verify = async (req, res) => {
  const token = req.headers["token"];
  try {
    const decode = await jwt.verify(token, "MoneyTrackerjwtencryption@1200");
    if (decode) {
      const user = await UserModel.findOne({ email: decode.email });
      user.password="";
      console.log("tttt",typeof(user),user)
      res.send({ stat: true, decode , user });
    } else {
      res.send({ stat: false });
    }
  } catch (err) {
    res.send({ stat: false, err: err.message });
  }
};

module.exports.update = async (req, res) => {
  const token = req.headers["token"];
  let field = req.headers["field"];
  const updates = req.headers["updates"];

  try {
    const decode = await jwt.verify(token, "MoneyTrackerjwtencryption@1200");
    console.log(decode, "-field-", field, "-updates-", updates);
    if (decode) {
      const data = await UserModel.findOneAndUpdate(
        { email: decode.email },
        { $set: { [field] : updates } }
      );
      res.send({stat: true, decode});
    } else {
      res.send({ stat: false });
    }
  } catch (err) {
    res.send({ stat: false, err: err.message });
  }
};

module.exports.addwallet = async (req, res) => {
  const token = req.headers["token"];
  let walletname = req.headers["walletname"];
  const amount = req.headers["amount"];

  try {
    const decode = await jwt.verify(token, "MoneyTrackerjwtencryption@1200");
    
    if (decode) {
       await UserModel.findOneAndUpdate(
        { email: decode.email },
        { $push: { Wallets: {"name":walletname,"amount":amount}}
       }
      );
      const data = await UserModel.findOne(
        { email: decode.email }
      );
      console.log("data is king",data)
      res.send({stat: true, decode , wallets: data.Wallets});
    } else {
      console.log(data)
      res.send({ stat: false });
    }
  } catch (err) {
    console.log("err",err)
    res.send({ stat: false, err: err.message });
  }
};

module.exports.addTransaction = async (req, res) => {
  const transaction = req.body;
  const token = req.headers["token"];

  
  try {
    const decode = await jwt.verify(token, "MoneyTrackerjwtencryption@1200");
    
    if (decode) {
      await UserModel.findOneAndUpdate(
        { email: decode.email },
        { $push: { transactions: { $each: [transaction], $position: 0 } } }
      );
      const data = await UserModel.findOne(
        { email: decode.email }
      );
      res.send({stat: true, decode , transactions: data.transactions});
      
    } else {
      console.log(data)
      res.send({ stat: false });
    }
  } catch (err) {
    console.log("err",err)
    res.send({ stat: false, err: err.message });
  }
};
