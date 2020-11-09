import { timeConversion } from './etc';

class TimeMoves {
  constructor() {
    this.sectionTimeMoves = this.createSection();
    this.countMoves = 0;
    this.countSeconds = 0;
    this.flagTime = false;
  }

  createSection() {
    const sectionTimeMoves = document.createElement('section');
    sectionTimeMoves.classList.add('section-timemove', 'display-none');
    document.body.appendChild(sectionTimeMoves);

    const timeElement = document.createElement('time');
    sectionTimeMoves.appendChild(timeElement);

    const moveElement = document.createElement('div');
    sectionTimeMoves.appendChild(moveElement);

    return sectionTimeMoves;
  }

  stopwatch(count) {
    if (this.flagTime) {
      this.sectionTimeMoves.firstChild.innerHTML = timeConversion(count);
      setTimeout(() => {
        this.countSeconds = count;
        this.stopwatch(count + 1);
      }, 1000);
    }
  }

  changeMoves() {
    this.countMoves += 1;
    this.sectionTimeMoves.lastChild.innerHTML = `Moves:${this.countMoves}`;
  }
}

export default TimeMoves;
