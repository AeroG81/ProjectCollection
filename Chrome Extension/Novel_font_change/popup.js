const FONT_KEY = 'fontKey';
const HEIGHT_KEY = 'heightKey';

let font = document.getElementById("font-range");
let fontLabel = document.getElementById("font-label");
chrome.storage.local.get('fontKey', (result) => {
    font.value = result.fontKey;
    fontLabel.innerText = "Font Size: " + result.fontKey + "px";
});

font.addEventListener("mouseup", () => {
    fontLabel.innerText = "Font Size: " + font.value + "px";
    chrome.storage.local.set(
        { 'fontKey': font.value }
    );
});

let height = document.getElementById("height-range");
let heightLabel = document.getElementById("height-label");
chrome.storage.local.get('heightKey', (result) => {
    height.value = result.heightKey;
    heightLabel.innerText = "Line Height: " + result.heightKey + "px";
});
height.addEventListener("mouseup", () => {
    heightLabel.innerText = "Font Size: " + height.value + "px";
    chrome.storage.local.set(
        { 'heightKey': height.value }
    );
});
