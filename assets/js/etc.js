function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

function divInt(a, b) {
  return (a - (a % b)) / b;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function searchDiff(empty, fill) {
  const diffLeft = Math.abs((+empty.style.left.replace('px', '') - +fill.style.left.replace('px', '')) / fill.style.width.replace('px', ''));
  const diffTop = Math.abs((+empty.style.top.replace('px', '') - +fill.style.top.replace('px', '')) / fill.style.height.replace('px', ''));
  return +(diffLeft + diffTop).toFixed(1);
}

function setDisplay(element, toggle) {
  return toggle === 'on' ? element.className.replace(' display-none', '') : `${element.className} display-none`;
}

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
function setSoundKey(frequency, type) {
  const newOscillator = context.createOscillator();
  const newGain = context.createGain();
  newOscillator.type = type;
  newOscillator.connect(newGain);
  newOscillator.frequency.value = frequency;
  newGain.connect(context.destination);
  newOscillator.start(0);

  newGain.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + 1,
  );
}

function timeConversion(count) {
  const min = divInt(count, 60);
  const second = count - min * 60;
  return `<span>${addZero(min)}</span>:<span>${addZero(second)}</span>`;
}

export {
  addZero, divInt, getRandomInt, searchDiff, setDisplay, timeConversion, setSoundKey,
};
