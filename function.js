function Redirect(url) {
    window.location.href = window.location.href + url;
}


function TitleHeight() {
    let Y = 1;
    if (window.scrollY - Y >= 0.5 || window.scrollY - Y <= -0.5) {
        Y = window.scrollY;
    }
    if (Y >= 340) {
        document.querySelector(".title").style.height = "442px";
    }
    else {
        document.querySelector(".title").style.height = 850 - Math.round(Y*1.2) + "px";
    }
}

function HeaderHeight() {
    let titleTextHeight = document.getElementById("titleText").getBoundingClientRect().top
    let titleHeight = -1;
    if (titleTextHeight - titleHeight >= 0.5 || titleTextHeight - titleHeight <= -0.5) {
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
}

function CardOpacity() {
    const cards = document.querySelectorAll('.card-show');
    cards.forEach(card => {
        let cardHeight = card.offsetHeight;
        let cardButton = card.getBoundingClientRect().bottom;
        let distanceToBottom = window.innerHeight - cardButton;
        let gap = (distanceToBottom + cardHeight) / cardHeight;
        let opacity;
        if (gap > 0 && gap < 1 ) {
            opacity = gap;
        }
        else if (gap >= 1) {
            opacity = 1;
        }
        else {
            opacity = 0;
        }
        card.style.opacity = opacity;
    });
}

function CardDisplayLoading() {
    const day = 2 //parseInt(window.location.href.slice(-1)) - 1;
    const quantity = database[day].length;
    const mainPage = document.querySelector(".main-page");
    for (let i = 0; i < quantity; i++) {
        const imageName = database[day][i].imageName;
        const description = database[day][i].description;

        const card = document.createElement("div");
        card.className = "content-card-setting card-show";

        const imgWrapper = document.createElement("div");
        imgWrapper.className = "img-wrapper image";

        const img = document.createElement("img");
        img.src = `Images/CardContent/Low/${imageName}`;
        img.alt = imageName;
        imgWrapper.setAttribute("onclick", `ShowFull("Images/CardContent/Full/${imageName}")`);

        imgWrapper.appendChild(img);

        const desc = document.createElement("p");
        desc.textContent = description;

        card.appendChild(imgWrapper);
        card.appendChild(desc);

        mainPage.appendChild(card);
    }
}

function ShowFull(path) {
    const modal = document.getElementById("fullscreen-modal");
    const modalImg = document.getElementById("fullscreen-image");
    const closeBtn = document.getElementsByClassName("close")[0];

    modal.style.display = "block";
    modalImg.src = path;

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // Add Hammer.js for touch gestures
    const hammer = new Hammer(modalImg);
    hammer.get('pinch').set({ enable: true });
    hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    let posX = 0, posY = 0, scale = 1, lastScale = 1, lastPosX = 0, lastPosY = 0;

    hammer.on('pan', function(e) {
        if (scale !== 1) {
            posX = lastPosX + e.deltaX;
            posY = lastPosY + e.deltaY;
            modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
        }
    });

    hammer.on('panend', function() {
        lastPosX = posX;
        lastPosY = posY;
    });

    hammer.on('pinch', function(e) {
        scale = Math.max(1, Math.min(lastScale * e.scale, 4));
        modalImg.style.transform = `translate(${posX}px, ${posY}px) scale(${scale})`;
    });

    hammer.on('pinchend', function() {
        lastScale = scale;
    });
}
