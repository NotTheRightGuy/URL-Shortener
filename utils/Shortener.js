const CryptoJS = require("crypto-js");

function generateShortURL(longURL) {
    const sha256Hash = CryptoJS.SHA256(longURL).toString();
    const shortIdentifier = sha256Hash.slice(0, 6);
    return shortIdentifier;
}

module.exports = generateShortURL;
