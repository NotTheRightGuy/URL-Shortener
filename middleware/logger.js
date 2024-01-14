function logger(req, res, next) {
    console.log("=========================================");
    console.log("Request Time: " + new Date().toISOString());
    console.log("Request Type: " + req.method);
    console.log("Request URL: " + req.originalUrl);
    console.log("Request IP: " + req.ip);
    next();
}

module.exports = logger;
