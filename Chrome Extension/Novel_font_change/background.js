// background.js

let font, height;
chrome.storage.sync.get(['font', 'line'], function(items) {
    font = items.font + "px";
    height = items.line + "px";
    console.log(font,height);
    let elem = document.getElementById("bookContent");
    if (elem != null) {
        elem.style = `font-size: ${font} !important; line-height:${height} !important`;
        console.log(elem);
    }
});
