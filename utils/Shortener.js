const CryptoJS = require("crypto-js");

function generateShortURL(longURL) {
    const shortCode = CryptoJS.MD5(longURL).toString().slice(0, 6);
    return shortCode;
}

module.exports = generateShortURL;
