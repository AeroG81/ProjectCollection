const FONT_KEY = 'fontKey';
const HEIGHT_KEY = 'heightKey';

let font = document.getElementById("font-range");
let fontLabel = document.getElementById("font-label");
chrome.storage.sync.get(['font'], function(items) {
    font.value = items.font;
    fontLabel.innerText = "Font Size: " + items.font + "px";
});

font.addEventListener("mouseup", () => {
    fontLabel.innerText = "Font Size: " + font.value + "px";

    chrome.storage.sync.set({ 'font': font.value }, function () {
        console.log('Settings saved');
    });
});

let height = document.getElementById("height-range");
let heightLabel = document.getElementById("height-label");
chrome.storage.sync.get(['line'], function(items) {
    height.value = items.line;
    heightLabel.innerText = "Line Height: " + items.line + "px";
});
height.addEventListener("mouseup", () => {
    heightLabel.innerText = "Line Height: " + height.value + "px";
    chrome.storage.sync.set({ 'line': height.value }, function () {
        console.log('Settings saved');
    });
});
