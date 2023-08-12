const mongoose = require("mongoose");
const userSchema = {
  username: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true },
  pass: { type: String, required: true },
};

const UserModel = mongoose.model("user", userSchema);
module.exports = UserModel;
