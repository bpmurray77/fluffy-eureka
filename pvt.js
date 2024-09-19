let testDuration = 0;
let lapses = 0;
let testInterval;
let stimulusTimeout;
let responseTimeStart;
let isStimulusActive = false;
const reactionBox = document.getElementById('reaction-box');
const testContainer = document.getElementById('test-container');
const timeRemainingDisplay = document.getElementById('time-remaining');
const lapsesDisplay = document.getElementById('lapses');
const buttonContainer = document.getElementById('button-container');

function startTest(minutes) {
    // Hide the test option buttons when the test starts
    buttonContainer.style.display = 'none';
    explanation.style.display = 'none';
    navwrapper2.style.display = 'none';

    testDuration = minutes * 60; // Convert minutes to seconds
    lapses = 0;
    isStimulusActive = false;
    lapsesDisplay.textContent = lapses;
    reactionBox.textContent = "Wait for it...";
    reactionBox.style.backgroundColor = "lightgray";
    testContainer.style.display = 'block';
    startCountdown();
}

function startCountdown() {
    let timeRemaining = testDuration;
    timeRemainingDisplay.textContent = formatTime(timeRemaining);

    testInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(testInterval);
            clearTimeout(stimulusTimeout);
            endTest();
        } else {
            timeRemaining--;
            timeRemainingDisplay.textContent = formatTime(timeRemaining);
        }
    }, 1000);

    startStimulusLoop();
}

function startStimulusLoop() {
    let randomDelay = Math.random() * 3000 + 2000; // Random delay between 2 and 5 seconds
    stimulusTimeout = setTimeout(() => {
        reactionBox.textContent = "CLICK!";
        reactionBox.style.backgroundColor = "green";
        responseTimeStart = Date.now();
        isStimulusActive = true;

        setTimeout(() => {
            if (isStimulusActive) { // User missed the stimulus
                registerLapse();
                resetStimulus();
            }
        }, 1000); // 1000ms (1 second) lapse threshold
    }, randomDelay);
}

function registerClick() {
    if (isStimulusActive) {
        let reactionTime = Date.now() - responseTimeStart;
        if (reactionTime > 500) { // Consider a lapse if reaction is more than 500ms
            registerLapse();
        }
        resetStimulus();
    }
}

function resetStimulus() {
    reactionBox.textContent = "Wait for it...";
    reactionBox.style.backgroundColor = "lightgray";
    isStimulusActive = false;
    startStimulusLoop();
}

function registerLapse() {
    lapses++;
    lapsesDisplay.textContent = lapses;
}

function endTest() {
    reactionBox.textContent = "Test Completed!";
    reactionBox.style.backgroundColor = "lightgray";
    clearTimeout(stimulusTimeout);
    alert(`Test complete! You had ${lapses} lapses.`);
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}