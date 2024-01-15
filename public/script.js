//! All the necessary DOM elements
const btn = document.getElementById("submit");
const longLink = document.getElementById("longurl");
const shortCode = document.getElementById("shortCode");
const shortUrl = document.getElementById("shortUrl");
const mainURL = window.location.href;

btn.addEventListener("click", (e) => {
    e.preventDefault();
    const url = longLink.value;
    const code = shortCode.value;
    if (url === "") {
        result.innerHTML = "Please enter a URL";
    } else {
        fetch("/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                url: url,
                shortCode: code,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                // Implement logic to display the shortened URL
            })
            .catch((err) => {
                result.innerHTML = err;
            });
    }
});
