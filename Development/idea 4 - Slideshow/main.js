var width = parseFloat(getComputedStyle(document.getElementsByClassName('slide')[0]).getPropertyValue("width"));
var widthAr = [];

for (let i = 0; i < document.getElementsByClassName('slide-wrapper')[0].children.length; i++) {
    let value = width * -i;
    widthAr.push(value);
}

document.getElementById('left').addEventListener('click', function (ev) {
    move(true);
});

document.getElementById('right').addEventListener('click', function (ev) {
    move(false);
});

document.getElementsByClassName('slide-wrapper')[0].addEventListener('wheel', function (ev) {
    if(ev.deltaY>0){
        move(false);
    }
    else{
        move(true);
    }
});

function move(direction) {
    var div = document.getElementsByClassName('slide-wrapper')[0];
    var style = getComputedStyle(div);
    var left = parseFloat(style.getPropertyValue("left"));
    var width = parseFloat(getComputedStyle(document.getElementsByClassName('slide')[0]).getPropertyValue("width"));
    var newLeft = 0;
    //direction true = left, false = right
    if (direction) {
        newLeft = left + width;
    }
    else {
        newLeft = left - width;
    }
    let end = false;
    if (widthAr.includes(newLeft)) {
        document.getElementsByClassName('slide-wrapper')[0].style.left = (newLeft) + 'px';
    }
    else {
        end = true;
    }
    return end;
}

var direction = false;
setInterval(() => {
    if (move(direction)) {
        if (direction) {
            direction = false;
        }
        else {
            direction = true;
        }
    }
}, 10000);