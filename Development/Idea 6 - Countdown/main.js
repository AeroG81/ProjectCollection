// Set the date we're counting down to
const key = 'timerdate';
var countDownDate = new Date(document.getElementById('date').value).getTime();

if(checkIfDataExistsLocalStorage()){
    countDownDate = getDataLocalStorage(0);
    document.getElementById('date').value = getDataLocalStorage(1);
}

document.getElementById('date').addEventListener('change', (e) => {
    countDownDate = new Date(document.getElementById('date').value).getTime();
    updateLocalStorage([countDownDate,document.getElementById('date').value]);
});

// Update the count down every 1 second
var x = setInterval(()=> {
    // Get today's date and time
    var now = new Date().getTime();
    console.log(new Date());
    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))-8;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the element with id="demo"
    if(!isNaN(distance)) {
        document.getElementById("timer").innerHTML = `<p class="day">${days}d</p>
        <p class="hour">${hours}h</p>
        <p class="min">${minutes}m</p>
        <p class="sec">${seconds}s</p>`;
    }

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("timer").innerHTML = "<p class='notify'>EXPIRED</p>";
    }
}, 1000);


function checkIfDataExistsLocalStorage() {
    let data = localStorage.getItem(key);
    // data exist
    if (data) {
        //checks for no undefined, empty and null datas
        if (data !== "" && data !== "undefined" && data !== null) {
            return true;
        }
        else {
            return false;
        }
    }
    //if data does not exist
    else {
        return false;
    }
}

function updateLocalStorage(data) {
    // converts objects --> string in order to be stored in local Storage
    let dataStr = JSON.stringify(data);
    // store data in local storage with specified key
    localStorage.setItem(key, dataStr);
}

function getDataLocalStorage(i) {
    let dataStr = localStorage.getItem(key);
    // converts data object in the form of string --> its object
    let dataObj = JSON.parse(dataStr);
    console.log(dataObj);
    return dataObj[i];
}
