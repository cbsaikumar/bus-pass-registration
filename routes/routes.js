const express = require("express");
const { validateRegisterUser } = require("../middlewares/registerUser");
const User = require("../models/user");

const router = express.Router();

//Post Method
router.post("/register", validateRegisterUser, async (req, res) => {
  const data = new User({
    first_name: req.body.firstName,
    last_name: req.body.lastName,
    gender: req.body.gender,
    password: req.body.password,
    email: req.body.email,
    dob: req.body.dob,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).json({ message: "Requesting user id is mandatory" });

  try {
    const user = await User.findById(id);
    res.status(200).json(user || { message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
router.patch("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await User.findByIdAndUpdate(id, updatedData, options);

    res.send(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Delete by ID Method
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = await User.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
