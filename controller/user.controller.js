const { Signtoken } = require("../middlewere/jwt");
const User = require("../model/user");

exports.createUser = (req, res) => {
  const { username, password } = req.body;

  const newUser = new User({
    username,
    password,
  });
  if (newUser) {
    newUser.save();
    res
      .status(201)
      .send({ message: "user Create  succesfully", data: newUser });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
};


exports.login = async(req, res) => {
    const { username, password } = req.body;
  
    const newUser = await User.findOne({username,password})
    if (newUser) {
       const data= await Signtoken(newUser)
      res
        .status(201)
        .send({ message: "user Create  succesfully", data });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  };


exports.alluser = async (req, res) => {
  const newUser = await User.find({});
  if (newUser) {
    res.status(201).send({ message: "user fetch succesfully", data: newUser });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
};
