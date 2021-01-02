document.getElementById("up").addEventListener('click',function(){
    window.scrollTo(0,1);
});

$(document).ready(function () {
    $("body").niceScroll();
    $(".hr").niceScroll({});
});