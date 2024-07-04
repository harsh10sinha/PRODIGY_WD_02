let timer;
let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let isRunning = false;

const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps');

// Initialize button states
startButton.disabled = false;
pauseButton.disabled = true;
resetButton.disabled = true;
lapButton.disabled = true;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', recordLap);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(() => {
            milliseconds += 10;
            if (milliseconds >= 1000) {
                milliseconds = 0;
                seconds++;
            }
            if (seconds >= 60) {
                seconds = 0;
                minutes++;
            }
            updateDisplay();
        }, 10);

        startButton.disabled = true;
        pauseButton.disabled = false;
        resetButton.disabled = false;
        lapButton.disabled = false;
    }
}

function pauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startButton.disabled = false;
        pauseButton.disabled = true;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    milliseconds = 0;
    seconds = 0;
    minutes = 0;
    updateDisplay();
    lapsList.innerHTML = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    resetButton.disabled = true;
    lapButton.disabled = true;
}

function recordLap() {
    const lapTime = `${pad(minutes)}:${pad(seconds)}:${pad(Math.floor(milliseconds / 10))}`;

    const li = document.createElement('li');
    li.textContent = lapTime;
    lapsList.appendChild(li);
}

function updateDisplay() {
    document.getElementById('milliseconds').textContent = pad(Math.floor(milliseconds / 10));
    document.getElementById('seconds').textContent = pad(seconds);
    document.getElementById('minutes').textContent = pad(minutes);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}