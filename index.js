const express = require("express");
const app = express();
app.use(express.json());

// Define PORT variable here

function callback() {
    // Log a message to the console indicating the server has started
}

// Define a route for GET requests to "/"
// Define a dynamic route for GET requests to "/:code"
// Define a route for POST requests to "/shorten"

app.listen(PORT, callback);
