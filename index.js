const express = require("express");
const app = express();
app.use(express.json());
const PORT = 1337;
const mongoose = require("mongoose"); // Importing mongoose

// Add your URI below to connect to your MongoDB database
const uri = "YOUR_URI_HERE";

function callback() {
    console.log(`Listening on PORT ${PORT}`);
}

function callbackToRunWhenConnected() {
    // This function will run when the connection is successful
    // Console log a message saying that the connection is successful
}

app.get("/", (req, res) => {
    res.json({ msg: "Hello World" });
});

app.get("/:code", (req, res) => {
    res.json({ code: req.params.code });
});

app.post("/shorten", (req, res) => {
    res.json({ msg: "POST successful" });
});

// This line connects to MongoDB
mongoose
    .connect(uri)
    .then(callbackToRunWhenConnected)
    .catch((err) => console.log(err));

app.listen(PORT, callback);
