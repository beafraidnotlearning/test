import { divInt } from './etc';

class SolutionCheck {
  constructor() {
    this.solve = [];
    this.solveFlag = false;
  }

  createSolve(lengthLine) {
    this.solve = [];
    for (let i = 0; i < lengthLine ** 2; i += 1) {
      const indexHeight = divInt(i, lengthLine);
      let indexWidth = i;
      while (indexWidth - (lengthLine - 1) > 0) {
        indexWidth -= lengthLine;
      }
      this.solve.push([indexHeight, indexWidth]);
    }
  }

  checkSolve(empty) {
    const currentSolve = Array.from(empty.parentNode.children);
    if (currentSolve.length !== this.solve.length) {
      this.createSolve(currentSolve.length ** 0.5);
    }
    for (let i = currentSolve.length - 1; i >= 0; i -= 1) {
      const diffTop = Math.abs(+currentSolve[i].style.top.replace('px', '') / +currentSolve[i].style.height.replace('px', '') - this.solve[i][0]);
      const diffLeft = Math.abs(+currentSolve[i].style.left.replace('px', '') / +currentSolve[i].style.width.replace('px', '') - this.solve[i][1]);

      if ((diffTop + diffLeft) !== 0) {
        return false;
      }
    }
    return true;
  }
}

export default SolutionCheck;
