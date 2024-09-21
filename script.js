const timers = [];

document.getElementById("start-timer").addEventListener("click", () => {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;

  if (hours === 0 && minutes === 0 && seconds === 0) {
    alert("Please enter a valid time!");
    return;
  }

  const totalTime = hours * 3600 + minutes * 60 + seconds;
  createNewTimer(totalTime);
});

function createNewTimer(totalTime) {
  const timerId = Date.now();
  let remainingTime = totalTime;

  const interval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(interval);
      timerEnded(timerId);
    } else {
      remainingTime--;
      updateTimerDisplay(timerId, remainingTime);
    }
  }, 1000);

  timers.push({ id: timerId, interval });
  displayTimer(timerId, totalTime);
}

function displayTimer(id, time) {
  const timerDisplay = document.createElement("div");
  timerDisplay.classList.add("timer-display");
  timerDisplay.setAttribute("data-id", id);

  timerDisplay.innerHTML = `
    <span class="time-display">Time Left : ${formatTime(time)}</span>
    <button class="stop-timer">Stop Timer</button>
  `;

  document.getElementById("active-timers").appendChild(timerDisplay);

  timerDisplay
    .querySelector(".stop-timer")
    .addEventListener("click", () => stopTimer(id));
}

function updateTimerDisplay(id, remainingTime) {
  const timerDisplay = document.querySelector(
    `.timer-display[data-id="${id}"] .time-display`
  );
  timerDisplay.textContent = `Time Left: ${formatTime(remainingTime)}`;
}

function timerEnded(id) {
  const timerDisplay = document.querySelector(
    `.timer-display[data-id="${id}"]`
  );
  //   timerDisplay.innerText = "Timer Is Up !";
  timerDisplay.innerHTML = `
  <span class="time-display" style="color: #34344A;">Timer Is Up !</span>
  <button class="stop-timer">Stop Timer</button>
`;

  document.getElementById("active-timers").appendChild(timerDisplay);
  const stopButton = timerDisplay.querySelector(".stop-timer");
  stopButton.style.backgroundColor = "black";
  stopButton.style.color = "white";
  stopButton.addEventListener("click", () => stopTimer(id));

  timerDisplay.classList.add("timer-ended");
  document.getElementById("alert-sound").play();
}

function stopTimer(id) {
  const timer = timers.find((t) => t.id === id);
  clearInterval(timer.interval);
  removeTimerFromDisplay(id);
}

function removeTimerFromDisplay(id) {
  const timerDisplay = document.querySelector(
    `.timer-display[data-id="${id}"]`
  );
  timerDisplay.remove();
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs}:${mins}:${secs}`;
}
