const btn = document.getElementById("submit");
const longLink = document.getElementById("longurl");
const shortCode = document.getElementById("shortCode");
const shortUrl = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copy");
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
                if (data.message != "Short Code already in use") {
                    result.innerHTML = `Your short URL is: <a href="${
                        mainURL + data.result.shortCode
                    }" target="_blank">${mainURL + data.result.shortCode}</a>`;
                } else {
                    result.innerHTML = `Short Code already in use`;
                }
            })
            .catch((err) => {
                result.innerHTML = err;
            });
    }
});
