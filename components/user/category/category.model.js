var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
    },
    { collection: "categories"}
);

const manufacturerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
    },
    { collection: "manufacturer"}
);

const Category = mongoose.model("categories", categorySchema)
const Manufacturer = mongoose.model("manufacturer", manufacturerSchema)

module.exports = {
    Category,
    Manufacturer
}