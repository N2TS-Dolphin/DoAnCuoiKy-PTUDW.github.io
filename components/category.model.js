var mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
    },
    { collection: "categories"}
);

const manufaturerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
    },
    { collection: "manufaturers"}
);

const Category = mongoose.model("categories", categorySchema)
const Manufaturer = mongoose.model("manufaturers", manufaturerSchema)

module.exports = {
    Category,
    Manufaturer
}