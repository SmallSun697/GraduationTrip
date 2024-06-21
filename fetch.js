fetch("header.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("header").innerHTML = data;
    })

fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.querySelector("footer").innerHTML = data;
    })
