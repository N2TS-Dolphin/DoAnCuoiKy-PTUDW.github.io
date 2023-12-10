// load những thư viện chúng ta cần
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// định nghĩ cấu trúc user model
const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { collection: "users" }
);

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("users", userSchema)
module.exports = {User};