var width = parseFloat(getComputedStyle(document.getElementsByClassName('slide')[0]).getPropertyValue("width"));
var widthAr = [];

for (let i = 0; i < document.getElementsByClassName('slide-wrapper')[0].children.length; i++) {
    let value = width * -i;
    widthAr.push(value);
}

function left() {
    document.getElementById('left').addEventListener('click', function (ev) {
        var div = document.getElementsByClassName('slide-wrapper')[0];
        var style = getComputedStyle(div);
        var left = parseFloat(style.getPropertyValue("left"));
        var width = parseFloat(getComputedStyle(document.getElementsByClassName('slide')[0]).getPropertyValue("width"));
        var newLeft = left + width;
        if (widthAr.includes(newLeft)) {
            document.getElementsByClassName('slide-wrapper')[0].style.left = (newLeft) + 'px';
        }
    })
}

function right() {
    document.getElementById('right').addEventListener('click', function (ev) {
        var div = document.getElementsByClassName('slide-wrapper')[0];
        var style = getComputedStyle(div);
        var left = parseFloat(style.getPropertyValue("left"));
        var width = parseFloat(getComputedStyle(document.getElementsByClassName('slide')[0]).getPropertyValue("width"));
        var newLeft = left - width;
        if (widthAr.includes(newLeft)) {
            document.getElementsByClassName('slide-wrapper')[0].style.left = (newLeft) + 'px';
        }
    })
}

left();
right();

/* 
    set auto slides by using setTimeOut()
*/