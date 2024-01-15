const express = require("express");
const app = express();
app.use(express.json());
const PORT = 1337;

const mongoose = require("mongoose"); // Importing mongoose
const Link = require("./models/Link"); // Importing Link model
const shortener = require("./utils/Shortener"); // Importing shortener function

// Add your URI below to connect to your MongoDB database
const uri = "YOUR_URI_HERE";

function callback() {
    console.log(`Listening on PORT ${PORT}`);
}

function callbackToRunWhenConnected() {
    console.log("Connected to MongoDB");
}

app.get("/", (req, res) => {
    res.json({ msg: "Hello World" });
});

app.get("/:code", (req, res) => {
    const urlShort = req.params.url;
    Link.findOne({ shortCode: urlShort })
        .then((result) => {
            if (result) {
                // Write logic to redirect to the original URL
            } else {
                res.json({ error: "No such URL Found" });
            }
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post("/shorten", (req, res) => {
    const url = req.body.url;
    const shortCode = req.body.shortCode;
    if (!url) {
        return res.json({
            status: "error",
            message: "No URL Provided",
        });
    }
    if (!shortCode) {
        Link.findOne({ url: url }).then((result) => {
            if (result) {
                res.json({
                    status: "success",
                    message: `Shortened URL Found`,
                    result: result,
                });
            } else {
                const link = new Link({
                    // Write logic to generate a short code
                    // and save it to the database
                });
                link.save()
                    .then((result) => {
                        res.json({
                            status: "success",
                            message: `URL Shortened`,
                            result: result,
                        });
                    })
                    .catch((err) => {
                        res.json({
                            status: "error",
                            message: `Error: ${err}`,
                        });
                    });
            }
        });
    } else {
        Link.findOne({ shortCode: shortCode }).then((result) => {
            if (!result) {
                const link = new Link({
                    shortCode: shortCode,
                    url: url,
                });
                // Write logic to save the link to the database
                // and return the result
            } else {
                res.json({
                    status: "error",
                    message: `Short Code already in use`,
                });
            }
        });
    }
});

// This line connects to MongoDB
mongoose
    .connect(uri)
    .then(callbackToRunWhenConnected)
    .catch((err) => console.log(err));

app.listen(PORT, callback);
