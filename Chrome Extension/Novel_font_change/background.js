// background.js

let font, height;
function readLocalStorage(key) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([key], function (result) {
            if (result[key] === undefined) {
                reject();
            } else {
                resolve(result[key]);
            }
        });
    });
};

readLocalStorage('fontKey').then(result => {
    font = result + "px";
});
readLocalStorage('heightKey').then(result => {
    height = result + "px";

    let elem = document.getElementById("bookContent");
    if (elem != null) {
        elem.style.fontSize = font;
        elem.style.lineHeight = height;
    }
    let para = document.getElementsByTagName("P");
    for (let i = 0; i < para.length; i++) {
        para[i].style.fontSize = font;
        para[i].style.lineHeight = height;
    }
});;

