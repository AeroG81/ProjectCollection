var sec = document.getElementById('sec');
var min = document.getElementById('min');
var hour = document.getElementById('hour');

setInterval(() => {
    var now = new Date();

    hour.style.transform = `rotateY(${-now.getHours() * 15 + 15}deg)`;

    min.style.transform = `rotateY(${-now.getMinutes() * 6 + 6}deg)`;

    sec.style.transform = `rotateY(${-now.getSeconds() * 6 + 6}deg)`;
}, 1000);


