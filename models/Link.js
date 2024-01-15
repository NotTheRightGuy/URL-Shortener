const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Link = new Schema({
    shortCode: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Link", Link);
