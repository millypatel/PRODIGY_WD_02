let startTime = 0;
let intervalId = null;
let laps = [];

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

function formatTime(ms) {
  const milliseconds = ms % 1000;
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  const msFormatted = String(milliseconds).padStart(3, "0");
  return `${hours}:${minutes}:${seconds}.${msFormatted}`;
}

function updateDisplay() {
  const now = Date.now();
  const elapsed = now - startTime;
  display.textContent = formatTime(elapsed);
}

function start() {
  startTime = Date.now() - (intervalId ? Date.now() - startTime : 0);
  intervalId = setInterval(updateDisplay, 50);
  toggleButtons(true);
}

function pause() {
  clearInterval(intervalId);
  intervalId = null;
  toggleButtons(false);
}

function reset() {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  display.textContent = "00:00:00.000";
  laps = [];
  lapsList.innerHTML = "";
  toggleButtons(false, true);
}

function lap() {
  const now = Date.now();
  const elapsed = now - startTime;
  const lapTime = formatTime(elapsed);
  laps.push(lapTime);
  const li = document.createElement("li");
  li.textContent = `Lap ${laps.length}: ${lapTime}`;
  lapsList.prepend(li); // latest lap on top
}

function toggleButtons(running, initial = false) {
  startBtn.disabled = running;
  pauseBtn.disabled = !running;
  lapBtn.disabled = !running;
  resetBtn.disabled = initial ? true : false;
}

// Attach events
startBtn.addEventListener("click", start);
pauseBtn.addEventListener("click", pause);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
