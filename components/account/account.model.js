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
    phone: { type: String, required: false },
    name: { type: String, required: false },
    gender: { type: String, required: false },
    birthday: { type: Date },
    role: { type: String, required: false },
    status: { type: Boolean, required: false },
    verificationCode: { type: String, required: false},
    registrationTime: { type: Date, required: false }
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