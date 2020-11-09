import Puzzle from './classPuzzle';

document.addEventListener('DOMContentLoaded', () => {
  const puzzle = new Puzzle();

  window.addEventListener('resize', () => {
    puzzle.resizeDisplay();
  });
});
