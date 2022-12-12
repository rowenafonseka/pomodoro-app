// 1. target all your DOM variables
// 2. target the start and pause buttons and set a handleClick function to them
// 3. in the handleClick function, break down timer into smaller pieces
//     * parse out each minute and second
//     * get total seconds
//     * decrement your seconds
//     * once it reaches 0, clear interval and say times URLSearchParams
//     * when pause button is paused also clear interval

const start = document.querySelector(".start");
const pause = document.querySelector(".pause");
const settings = document.querySelector(".settings");
const ring = document.querySelector(".ring");
const minute = document.querySelector(".minutes input");
const second = document.querySelector(".seconds input");

const audio = new Audio(
  "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
);

// create a function so that when start button is clicked, timer starts counting

const timer = () => {
  // the minutes and seconds are strings in the html. we need to parse them into integers
  let minutes = parseInt(minute.value);
  let seconds = parseInt(second.value);

  //   now we have these as int, we want the total seconds. Because once total seconds is zero we can say time's up
  let totalSeconds = minutes * 60 + seconds;
  let currentSeconds = totalSeconds;

  // use setInterval method to make the seconds decrement over and over
  // within that method put in that once time reaches 0 it will say 'times up!'
  // the setInterval method will call a specified function at specified time intervals. we set ours to 1000 ms
  // the setInterval method will continue until we call the 'clearInterval' method

  let interval = setInterval(() => {
    // decrement the current total seconds first
    currentSeconds--;
    let minutesLeft = Math.floor(currentSeconds / 60);
    let secondsLeft = currentSeconds % 60;
    if (minutesLeft.toString().length === 1) {
      minutesLeft = "0" + minutesLeft;
    }
    if (secondsLeft.toString().length === 1) {
      secondsLeft = "0" + secondsLeft;
    }
    minute.value = minutesLeft;
    second.value = secondsLeft;

    // alert time's up once total seconds reaches 0
    if (currentSeconds === 0) {
      clearInterval(interval);
      alert("Time is up!");
      ring.style.stroke = "red";
      return;
    }

    //  pause handleclick to clearInterval when pause button is clicked
    pause.addEventListener("click", () => {
      clearInterval(interval);
      settings.removeAttribute("disabled");
      start.classList.remove("hidden");
      pause.classList.add("hidden");
      audio.play();
    });
  }, 1000);
};

// handle click function to start timer
const startTimer = () => {
  start.addEventListener("click", () => {
    timer();
    start.classList.add("hidden");
    pause.classList.remove("hidden");
    minute.setAttribute("disabled", true);
    second.setAttribute("disabled", true);
    settings.setAttribute("disabled", true);
  });
};

// function to edit the timer
const editTimer = () => {
  settings.addEventListener("click", () => {
    minute.toggleAttribute("disabled");
    second.toggleAttribute("disabled");
    // parseint the values so user can add integers
    let minutes = parseInt(minute.value);
    let seconds = parseInt(second.value);
  });
};

// function to enable the app
const pomodoro = () => {
  startTimer();
  editTimer();
};

pomodoro();
