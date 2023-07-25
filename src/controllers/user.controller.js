const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    pic: req.body.pic,
    street: req.body.street,
    zip: req.body.zip,
    apartment: req.body.apartment,
    country: req.body.country,
    phone: req.body.phone,
    city: req.body.city,
    isAdmin: req.body.isAdmin,
  });
  user = await user.save();
  if (!user) {
    return res.status(200).send("User not created");
  }
  res.status(200).send(user);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).send("Cannot find user");
  }
  res.status(200).send(user);
};

const getAllUser = async (req, res) => {
  const users = await User.find().select("-password -confirmPassword");

  if (!users) {
    return res.status(404).send("Cannot find users");
  }
  res.status(200).send(users);
};

const updateUser = async (req, res) => {
  const updateUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      pic: req.body.pic,
      street: req.body.street,
      zip: req.body.zip,
      apartment: req.body.apartment,
      country: req.body.country,
      phone: req.body.phone,
      city: req.body.city,
    },
    { new: true }
  );
  if (!updateUser) {
    return res.status(400).send(`User's Update failed`);
  }
  res.status(200).send(updateUser);
};

const deleteUser = async (req, res) => {
  const deleteUser = await User.findByIdAndDelete(req.params.id, { new: true });
  if (deleteUser) {
    return res.status(200).send(deleteUser);
  }
  res.status(400).send("Failed to delete user");
};

const loginUser = async (req, res) => {
    const secret = process.env.secret
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("This User is not found");
  }
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin : user.isAdmin
      },
      secret, {expiresIn : '1d'}
    );

    return res.status(200).send({ user: user.email, token: token });
  }
  res.status(400).send("Your password is Incorrect");
};

const countUsers  = async (req, res) => {
  const countUser = await User.countDocuments()

  if(!countUser) {
    return res.status(400).send('User count failed')
  }
  res.status(200).send({countUser : countUser})
}

module.exports = {
  registerUser,
  getUser,
  getAllUser,
  updateUser,
  deleteUser,
  loginUser,
  countUsers
};
