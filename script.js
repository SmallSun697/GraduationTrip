document.addEventListener("DOMContentLoaded", function() {
    TitleHeight();
    HeaderHeight();
    CardOpacity();
});

window.addEventListener("scroll", function() {
    HeaderHeight();
    TitleHeight();
    CardOpacity();
});
