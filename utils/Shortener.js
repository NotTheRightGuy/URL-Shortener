const CryptoJS = require("crypto-js");

function generateShortURL(longURL) {
    const hash = CryptoJS.MD5(longURL).toString();
    const shortURL = hash.substring(0, 6);
    return shortURL;
}

module.exports = generateShortURL;
