const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  first_name: {
    required: true,
    type: String,
  },
  last_name: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  dob: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  gender: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("User", dataSchema);
