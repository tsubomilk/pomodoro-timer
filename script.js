let workTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60; // 5 minutes
let isRunning = false;
let isWorkTime = true;
let interval;

  // ローカルストレージからデータを取得
const storedWorkTime = localStorage.getItem('workTime');
const storedBreakTime = localStorage.getItem('breakTime');
const storedIsWorkTime = localStorage.getItem('isWorkTime');

if (storedWorkTime) {
    workTime = parseInt(storedWorkTime, 10);
}

  if (storedBreakTime) {
    breakTime = parseInt(storedBreakTime, 10);
  }

  if (storedIsWorkTime) {
    isWorkTime = JSON.parse(storedIsWorkTime);
  }

  function updateCurrentTime() {
    const now = new Date();
    document.getElementById('currentTime').textContent = 'Current: ' + now.toLocaleTimeString('ja-JP');
  }

  // 以下の部分でポモドーロの時間を更新
document.getElementById('workTime').textContent = 'Work🧑‍💻: ' + formatTime(workTime);
document.getElementById('breakTime').textContent = 'Break☕️: ' + formatTime(breakTime);


 function toggleTimer() {
  if (isRunning) {
    clearInterval(interval);
    document.getElementById('toggleButton').textContent = 'START';
    isRunning = false;
  } else {
    if (isWorkTime) {
      startWorkTimer();
    } else {
      startBreakTimer();
    }
    document.getElementById('toggleButton').textContent = 'STOP';
    isRunning = true;
  }
}

function startWorkTimer() {
  interval = setInterval(() => {
    workTime--;
    document.getElementById('workTime').textContent = 'Work🧑‍💻: ' + formatTime(workTime);
    // 以下の部分でローカルストレージにデータを保存
    localStorage.setItem('workTime', workTime.toString());

    if (workTime <= 0) {
      clearInterval(interval);
      playBell();
      isWorkTime = false;
      breakTime = 5 * 60;
      localStorage.setItem('breakTime', breakTime.toString());
      localStorage.setItem('isWorkTime', JSON.stringify(isWorkTime));
      toggleTimer();
    }
  }, 1000);
}

function startBreakTimer() {
  interval = setInterval(() => {
    breakTime--;
    document.getElementById('breakTime').textContent = 'Break☕️: ' + formatTime(breakTime);
    localStorage.setItem('breakTime', breakTime.toString());

    if (breakTime <= 0) {
      clearInterval(interval);
      alert('Complete Tasks Together！');
      isWorkTime = true;
      workTime = 25 * 60;
      localStorage.setItem('workTime', workTime.toString());
      localStorage.setItem('isWorkTime', JSON.stringify(isWorkTime));
      toggleTimer();
    }
  }, 1000);
}

  function playBell() {
    const bell = document.getElementById('bell');
    bell.play();
  }

  function formatTime(seconds) {
  var mins = Math.floor(seconds / 60);
  var secs = seconds % 60;
  return (mins < 10 ? '0' : '') + mins + ':' + (secs < 10 ? '0' : '') + secs;
  }

  // Update current time every second
  setInterval(updateCurrentTime, 1000);
