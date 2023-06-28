const UserModel = require("../models/UserModel.js");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");


module.exports.welcome = async (req, res) => {
  res.send("Welcome to Money tracker")
};


module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email: email });
  if (user === null) {
    res.send("notfound");
  } else {
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        {
          data: email,
        },
        "secret",
        { expiresIn: '12h' }
      );
      res.send({ stat: "sucess", token: token });
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
    const decode = await jwt.verify(token, "secret");
    if (decode) {
      res.send({ stat: true, decode });
    } else {
      res.send({ stat: false });
    }
  } catch (err) {
    res.send({ stat: false, err: err.message });
  }
};
