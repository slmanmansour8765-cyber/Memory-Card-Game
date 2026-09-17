let themeBtn = document.getElementById("theme");
let soundBtn = document.getElementById("sound");

let soundStatus = true;

themeBtn.onclick = function () {
  let currentTheme = document.body.getAttribute("data-theme");

  if (currentTheme === "dark") {
    document.body.removeAttribute("data-theme");
    themeBtn.textContent = "☀️ الوضع النهاري";
  } else {
    document.body.setAttribute("data-theme", "dark");
    themeBtn.textContent = "🌙 الوضع الليلي";
  }
};
soundBtn.onclick = function () {
  if (soundStatus === true) {
    soundStatus = false;
    soundBtn.textContent = "🔇 الصوت: مكتوم";
  } else {
    soundStatus = true;
    soundBtn.textContent = "🔊 الصوت: مفعل";
  }
};
function playSound(freq, duration) {
  if (soundStatus === false) return;
  try {
    let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    let osc = audioCtx.createOscillator();
    osc.connect(audioCtx.destination);
    osc.frequency.value = freq;
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {}
}

function playFlipSound() {
  playSound(400, 0.08);
}
function playMatchSound() {
  playSound(600, 0.15);
}
function playWinSound() {
  playSound(800, 0.3);
}
