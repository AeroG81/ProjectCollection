var date = document.getElementById('date');
var hour = document.getElementById('hour');
var min = document.getElementById('min');
var sec = document.getElementById('sec');

var x = setInterval(() => {
    var now = new Date();
    if (date.innerHTML !== `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`) {
        date.innerHTML = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    }
    if (hour.innerHTML !== now.getHours()) {
        hour.innerHTML = now.getHours();
    }
    if (min.innerHTML !== now.getMinutes()) {
        min.innerHTML = now.getMinutes();
    }
    sec.innerHTML = now.getSeconds();
}, 1000);

