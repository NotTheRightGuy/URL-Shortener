const CryptoJS = require("crypto-js");

function generateShortURL(longURL) {
    // Write logic to generate a short URL
    // We wil use MD5 hashing algorithm to generate a hash of the long URL
    // Then just take the first 6 characters of the hash and return it
}

module.exports = generateShortURL;
