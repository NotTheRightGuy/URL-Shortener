const express = require("express");
const app = express();
app.use(express.json());
// Define PORT variable here
const PORT = 1337;

function callback() {
    // Log a message to the console indicating the server has started
    console.log(`Listening on PORT ${PORT}`);
}

// Define a route for GET requests to "/"
app.get("/", (req, res) => {
    res.json({ msg: "Hello World" });
});
// Define a dynamic route for GET requests to "/:code"
app.get("/:code", (req, res) => {
    res.json({ code: req.params.code });
});
// Define a route for POST requests to "/shorten"
app.post("/shorten", (req, res) => {
    res.json({ msg: "POST successful" });
});

app.listen(PORT, callback);
