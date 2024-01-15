const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Link = new Schema({
    url: {
        type: String,
        required: true,
    },
    // Define shortCode field here
});

module.exports = mongoose.model("Link", Link);
