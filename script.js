window.addEventListener("scroll", function() {
    //Title
    var Y = 1;
    if (window.scrollY - Y >= 1 || window.scrollY - Y <= -1) {
        Y = window.scrollY;
    }
    if (Y >= 340) {
        document.querySelector(".title").style.height = "442px";
    }
    else {
        document.querySelector(".title").style.height = 850 - Math.round(Y*1.2) + "px";
    }
    //console.log("Y=" + Y);

    //Header
    var titleTextHeight = document.getElementById("titleText").getBoundingClientRect().top
    var titleHeight = -1;
    if (titleTextHeight - titleHeight >= 1 || titleTextHeight - titleHeight <= -1) {
        titleHeight = titleTextHeight;
    }
    if (titleHeight < 0) {
        if (titleHeight >= -60) {
            document.querySelector('header').style.height = titleHeight*-1 + "px";
        }
        else {
            document.querySelector('header').style.height = "60px"
        }
    }
    else {
        document.querySelector('header').style.height = "0px";
    }
    //console.log(titleHeight);

    //Card
    CardOpacity(1);
    CardOpacity(2);
    CardOpacity(3);
    CardOpacity(4);
});

function CardOpacity (number) {
    var cardNumber = document.getElementById("card" + number);
    if (!number) return;
    var cardHeight = cardNumber.offsetHeight;
    var cardButton = cardNumber.getBoundingClientRect().bottom;
    var distanceToBottom = window.innerHeight - cardButton;
    document.getElementById("card" + number).style.opacity = (distanceToBottom + cardHeight) / cardHeight;
    //console.log(number + ":" + (distanceToBottom + cardHeight) / cardHeight);
}

function redirect (url) {
    window.location.href = window.location.href + url;
}
