// load những thư viện chúng ta cần
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// định nghĩ cấu trúc user model
const accountSchema = new mongoose.Schema(
  {
    username: { type: String },
    email: { type: String },
    password: { type: String },
    facebookID: { type: String },
    googleID: { type: String },
    avatar: { type: String },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: String, required: true },
    birthday: { type: Date },
    role: { type: String, required: true },
    status: { type: Boolean, required: true },
    registrationTime: { type: Date, required: true }
  },
  { collection: "accounts" }
);

accountSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

accountSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Account = mongoose.model("accounts", accountSchema)
module.exports = { Account };