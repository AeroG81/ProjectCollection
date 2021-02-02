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
}

var list = document.querySelectorAll('.todo__container_day-group');
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function (ev) {
        console.log(ev);
        if (ev.target.tagName === 'I') {
            ev.target.classList.toggle('show');
            ev.target.classList.toggle('hide');
        }
    }, false);
}

/* parentElement,nextSibling/previous */