class TaskPerDay {
    constructor(day) {
        this._day = day;
        this._list = [];
    }
    get day() {
        return this._day;
    }
    get list() {
        return this._list;
    }
    addTask(task) {
        let newTask = {
            task: task,
            checked: false
        }
        this._list.push(newTask);
    }
    removeTask(index) {
        this._list.splice(index, 1);
    }
    fromData(dataObject) {
        this._day = dataObject._day;
        this._list = dataObject._list;
    }
}

class DayList {
    constructor() {
        this._dayList = [];
        const day = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun']
        for (let i = 0; i < day.length; i++) {
            let item = new TaskPerDay(day[i]);
            this._dayList.push(item);
        }
    }
    get DayList() {
        return this._dayList;
    }
    getDayList(i) {
        return this._dayList[i];
    }
    fromData(dataObject) {
        this._dayList = [];
        let data = dataObject._dayList;
        for (let i = 0; i < data.length; i++) {
            let newD = new TaskPerDay();
            newD.fromData(data[i]);
            this._dayList.push(newD);
        }
    }
}

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

function getDataLocalStorage() {
    let dataStr = localStorage.getItem(key);
    // converts data object in the form of string --> its object
    let dataObj = JSON.parse(dataStr);
    return dataObj;
}


function adding() {
    let backdrop = document.getElementById('bkdrop');
    let taskform = document.getElementById('taskform');
    taskform.classList.remove('hide');
    backdrop.classList.remove('hide');
    backdrop.addEventListener('click', function () {
        taskform.classList.add('hide');
        backdrop.classList.add('hide');
    });
}

function remove() {
    let backdrop = document.getElementById('bkdrop');
    let removeform = document.getElementById('removeform');
    backdrop.classList.remove('hide');
    removeform.classList.remove('hide');
    backdrop.addEventListener('click', function () {
        removeform.classList.add('hide');
        backdrop.classList.add('hide');
    });
    dayListener();
}

function addTask() {
    var data1 = document.getElementById('day-add').value;
    var data2 = document.getElementById('task-add').value;
    dayList.DayList[data1].addTask(data2);
    updateLocalStorage(dayList);
    showTask();
}

function removeTask() {
    let daySelect = document.getElementById('day-remove');
    let shorthand = dayList.DayList[daySelect.value].list;
    let taskSelect = document.getElementById('task-remove');
    shorthand.splice(taskSelect.value, 1);
    updateLocalStorage(dayList);
    showTask();
    dayListener();
}

function showTask() {
    //To show task as word at the right of the page
    let title = document.getElementById('task-list-title');
    let day = new Date().getDay();
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    title.innerText = week[day];
    let target1 = document.getElementById('task-list');
    let output1 = "";
    let outputday = 0;
    if (day == 0) {
        outputday = 6;
    }
    else {
        outputday = day - 1;
    }
    for (let j = 0; j < dayList.DayList[outputday].list.length; j++) {
        if (dayList.DayList[outputday].list[j].checked) {
            output1 += `
            <li class="checked"><i class="fab fa-gripfire"></i>${dayList.DayList[outputday].list[j].task}</li>
            `;
        }
        else {
            output1 += `
            <li><i class="fab fa-gripfire"></i>${dayList.DayList[outputday].list[j].task}</li>
            `;
        }
    }
    target1.innerHTML = output1;
    showBattery(outputday);

    //To show task as icon at the left of the page
    for (let i = 0; i < dayList.DayList.length; i++) {
        let shorthand = dayList.DayList[i];
        let target2 = document.getElementById(`${shorthand.day}-list`);
        let colorId = i + 1;
        let output2 = "";
        for (let j = 0; j < dayList.DayList[i].list.length; j++) {
            let display = "";
            if (dayList.DayList[i].list[j].checked) {
                display = "hide";
            }
            output2 += `                
            <div class="todo__container_day-group" title="${shorthand.list[j].task}" onclick="checkedTask(${i},${j})">
                <i class="fas fa-calendar color-${colorId} ${display}"></i>
                <i class="fas fa-calendar-check color-${colorId}"></i>
                <i class="fas fa-calendar-times color-${colorId} hide"></i>
            </div>`;

        }
        target2.innerHTML = output2;
    }

    //To allow checked feature 
    var list = document.querySelectorAll('.todo__container_day-group');
    for (let i = 0; i < list.length; i++) {
        list[i].addEventListener('click', function (ev) {
            if (ev.target.nextElementSibling.classList[1] === "fa-calendar-check") {
                ev.target.classList.toggle('hide');
            }
            else if (ev.target.nextElementSibling.classList[1] === "fa-calendar-times") {
                ev.target.previousElementSibling.classList.toggle('hide');
            }
        }, false);
    }
}

function showBattery(day) {
    var battery = document.getElementsByClassName('todo__battery')[0];
    console.log(battery);
    for (let i = 0; i < 5; i++) {
        battery.children[i].classList.add('hide');
    }
    switch (day) {
        case 0:
            battery.children[0].classList.remove('hide');
            break;
        case 1:
            battery.children[1].classList.remove('hide');
            break;
        case 2:
            battery.children[2].classList.remove('hide');
            break;
        case 3:
            battery.children[3].classList.remove('hide');
            break;
        case 4:
            battery.children[4].classList.remove('hide');
            break;
        case 5:
            battery.children[3].classList.remove('hide');
            break;
        case 6:
            battery.children[2].classList.remove('hide');
            break;
    }
}

function checkedTask(dayId, taskId) {
    if (dayList.DayList[dayId].list[taskId].checked) {
        dayList.DayList[dayId].list[taskId].checked = false;
    }
    else {
        dayList.DayList[dayId].list[taskId].checked = true;
    }
    updateLocalStorage(dayList);
    showTask();
}

function dayListener() {
    let daySelect = document.getElementById('day-remove');
    let shorthand = dayList.DayList[daySelect.value].list;
    document.getElementById("task-remove").innerHTML = '';
    for (let item in shorthand) {
        let opt = document.createElement("option");
        opt.textContent = shorthand[item].task;
        opt.value = item;
        document.getElementById("task-remove").appendChild(opt);
    }
}

//class initialise
let dayList = new DayList();
const key = 'taskData';
//check if localStorage Exist
let dataExist = checkIfDataExistsLocalStorage();
if (dataExist === true) {
    dayList = new DayList();
    dayList.fromData(getDataLocalStorage());
}
else if (dataExist === false) {
    updateLocalStorage(dayList);
}
else {
    alert("ERROR IN CODE");
}

var submission = document.getElementById('taskform');
submission.addEventListener('submit', function (e) {
    e.preventDefault();
    addTask();
});

var deletion = document.getElementById('removeform');
deletion.addEventListener('submit', function (e) {
    e.preventDefault();
    removeTask();
});

document.getElementById('day-remove').addEventListener('change', function () {
    dayListener();
});

showTask();

/*Improvement to made
1. Loading Animation
2. Mobile Design
3. Better Colour Theme
*/