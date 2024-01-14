//* Imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const Link = require("./models/Link");
const generateShortURL = require("./utils/Shortener");
const logger = require("./middleware/logger");

//* Middleware
app.use(express.json());
app.use(express.static("public"));
app.use(logger);

//* Variables
const port = 1337;
const db_password = process.env.MONGODB_PASSWORD;
const uri = `mongodb+srv://NotTheRightGuy:${db_password}@cluster0.gf1otxj.mongodb.net/shortener?retryWrites=true&w=majority`;

//* Route Definitions
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/:url", (req, res) => {
    const urlShort = req.params.url;
    Link.findOne({ shortCode: urlShort })
        .then((result) => {
            if (result) {
                res.redirect(result.url);
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
                    shortCode: generateShortURL(url),
                    url: url,
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
            } else {
                res.json({
                    status: "error",
                    message: `Short Code already in use`,
                });
            }
        });
    }
});

//* Connection Part
mongoose
    .connect(uri)
    .then(() => {
        console.log("Connected to MongoDB Instance");
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(port, () => {
    console.log(`URL Shortener listening at http://localhost:${port}`);
});
