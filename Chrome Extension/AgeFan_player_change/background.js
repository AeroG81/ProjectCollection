// background.js
var timeout = setInterval(replaceVideo,3000);

function replaceVideo() {
  let elem = document.getElementById("age_playfram");
  if (elem != null) {
    let video = elem.contentWindow.document.getElementsByTagName("VIDEO")[0];
    if (video != null) {
      let original = document.getElementById("ageframediv");
      video.controls = true;
      original.parentNode.replaceChild(video, original);
      if (confirm("New Video Page")) {
        window.open(video.currentSrc, '_blank').focus();
      }
      clearInterval(timeout);
    }
  }
};
