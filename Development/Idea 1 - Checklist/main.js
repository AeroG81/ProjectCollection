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
    shorthand.splice(taskSelect.value,1);
    updateLocalStorage(dayList);
    showTask();
    dayListener();
}

function showTask() {
    let count = dayList.DayList.length;
    for (let i = 0; i < count; i++) {
        let shorthand = dayList.DayList[i];
        var target = document.getElementById(`${shorthand.day}-list`);
        target.innerHTML = '';
        for (let j = 0; j < dayList.DayList[i].list.length; j++) {
            let data = document.createElement("li");
            data.textContent = shorthand.list[j].task;
            target.appendChild(data);
            if (shorthand.list[j].checked) {
                data.classList.toggle('checked');
            }
        }
    }
}

function checkedTask(id, content) {
    let dayId = id.split('-')[0];
    const day = ['mon', 'tues', 'wed', 'thur', 'fri', 'sat', 'sun']
    let dayIndex = day.indexOf(dayId);
    let shorthand = dayList.DayList[dayIndex].list;
    let taskIndex = -1;
    for (let item in shorthand) {
        if (shorthand[item].task == content) {
            taskIndex = parseInt(item);
        }
    }
    if (shorthand[taskIndex].checked == true) {
        shorthand[taskIndex].checked = false;
    }
    else {
        shorthand[taskIndex].checked = true;
    }
    updateLocalStorage(dayList);
}

function adding() {
    let backdrop = document.getElementById('bkdrop');
    let taskform = document.getElementById('taskform');
    let removeform = document.getElementById('removeform');
    taskform.classList.add('show');
    backdrop.classList.add('show');
    removeform.classList.remove('show');
    backdrop.addEventListener('click', function () {
        taskform.classList.remove('show');
        removeform.classList.remove('show');
        backdrop.classList.remove('show');
    });
}

function remove() {
    let backdrop = document.getElementById('bkdrop');
    let removeform = document.getElementById('removeform');
    let taskform = document.getElementById('taskform');
    backdrop.classList.add('show');
    removeform.classList.add('show');
    taskform.classList.remove('show');
    backdrop.addEventListener('click', function () {
        taskform.classList.remove('show');
        removeform.classList.remove('show');
        backdrop.classList.remove('show');
    });
    dayListener();
}


function dayListener(){
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

let dayList = new DayList();
const key = 'saveData';

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

console.log(dayList);

var list = document.querySelectorAll('ul');
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function (ev) {
        if (ev.target.tagName === 'LI') {
            checkedTask(ev.target.parentElement.id, ev.target.innerText)
            ev.target.classList.toggle('checked');
        }
    }, false);
}
/*
var backdrop = document.getElementById('bkdrop');
var taskform = document.getElementById('taskform');
backdrop.addEventListener('click', function () {
    taskform.classList.toggle('show');
    backdrop.classList.toggle('show'); 
})
*/
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

showTask();

document.getElementById('day-remove').addEventListener('change', function () {
    dayListener();
})
/*
    function missing:
    1. removeTask function that allow users to remove the task
    2. checkedTask function that will save once the task was checked which will not reset when the webpage was reset
 let toggle = checkedTask(ev.target.parentElement.id,ev.target.innerText);
            if(toggle){
                ev.target.classList.add('checked');
            }
            else{
                ev.target.classList.remove('checked');
            }
    */