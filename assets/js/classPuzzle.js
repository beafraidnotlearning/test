import {
  divInt, getRandomInt, searchDiff, setDisplay, setSoundKey, timeConversion,
} from './etc';
import TimeMoves from './classTimeMoves';
import SolutionCheck from './classSolutionCheck';

class Puzzle {
  constructor() {
    this.solutionCheck = new SolutionCheck();
    this.timeMoves = new TimeMoves();
    this.gameBoard = this.createBoard();
    this.gamePopUpButton = this.createPopUpButton();
    this.setBoardSize();

    this.gameMenu = this.createMenu();
    this.gamePuzzle = this.createPuzzle();
    this.gameLoad = this.createLoad();
    this.gameScores = this.createScores();
    this.gameSettings = this.createSettings();
    this.gameHelp = this.createHelp();
    this.gamePopUp = this.createPopUp();
    this.setFontSize();

    this.displacementArr = new Array(0);
    this.imageIndex = 0;
  }

  createBoard() {
    const gameBoard = document.createElement('section');
    gameBoard.className = 'game-board';
    document.body.appendChild(gameBoard);

    return gameBoard;
  }

  setBoardSize() {
    if (window.innerWidth > window.innerHeight) {
      this.gameBoard.style.width = `${window.innerHeight * 0.6}px`;
      this.gameBoard.style.height = `${window.innerHeight * 0.6}px`;
      this.timeMoves.sectionTimeMoves.style.width = `${window.innerHeight * 0.6}px`;
    } else {
      this.gameBoard.style.width = `${window.innerWidth * 0.6}px`;
      this.gameBoard.style.height = `${window.innerWidth * 0.6}px`;
      this.timeMoves.sectionTimeMoves.style.width = `${window.innerWidth * 0.6}px`;
    }
    this.timeMoves.sectionTimeMoves.firstChild.style.height = `${+this.gameBoard.style.height.replace('px', '') * 0.09}px`;
    this.timeMoves.sectionTimeMoves.firstChild.style.width = `${+this.timeMoves.sectionTimeMoves.firstChild.style.height.replace('px', '') * 2.5}px`;
    this.timeMoves.sectionTimeMoves.lastChild.style.height = this.timeMoves.sectionTimeMoves.firstChild.style.height;
    this.timeMoves.sectionTimeMoves.lastChild.style.width = `${+this.timeMoves.sectionTimeMoves.lastChild.style.height.replace('px', '') * 4}px`;
    this.gameBoard.style.borderWidth = `${+this.gameBoard.style.width.replace('px', '') * 0.06}px`;
    this.gamePopUpButton.style.height = `${+this.gameBoard.style.height.replace('px', '') * 0.09}px`;
    this.gamePopUpButton.style.width = `${+this.gamePopUpButton.style.height.replace('px', '') * 3}px`;
  }

  setFontSize() {
    this.gameBoard.style.fontSize = `${+this.gameBoard.style.height.replace('px', '') * 0.1}px`;
    this.gameLoad.style.fontSize = `${+this.gameBoard.style.height.replace('px', '') * 0.07}px`;
    this.gameScores.style.fontSize = `${+this.gameBoard.style.height.replace('px', '') * 0.07}px`;
    this.gameSettings.children[1].children[0].style.fontSize = `${+this.gameBoard.style.height.replace('px', '') * 0.1}px`;
    this.timeMoves.sectionTimeMoves.style.fontSize = `${+this.gameBoard.style.height.replace('px', '') * 0.07}px`;
    this.gamePopUpButton.style.fontSize = `${+this.gameBoard.style.height.replace('px', '') * 0.07}px`;
  }

  createPopUpButton() {
    const gamePopUpButton = document.createElement('div');
    gamePopUpButton.className = 'game-popup-button display-none';
    gamePopUpButton.innerHTML = 'Pause';
    document.body.appendChild(gamePopUpButton);

    gamePopUpButton.addEventListener('click', () => {
      if (gamePopUpButton.innerHTML === 'Pause') {
        this.gamePopUp.className = setDisplay(this.gamePopUp, 'on');
        this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'off');
        gamePopUpButton.innerHTML = 'Resume';
        this.timeMoves.flagTime = false;
      } else {
        this.gamePopUp.className = setDisplay(this.gamePopUp, 'off');
        this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'on');
        gamePopUpButton.innerHTML = 'Pause';
        this.timeMoves.flagTime = true;
        this.timeMoves.stopwatch(this.timeMoves.countSeconds);
      }
    });

    return gamePopUpButton;
  }

  createPopUp() {
    const gamePopUp = document.createElement('section');
    gamePopUp.className = 'game-popup display-none';
    this.gameBoard.appendChild(gamePopUp);
    this.fillPopUp(gamePopUp);
    return gamePopUp;
  }

  fillPopUp(gamePopUp) {
    const gamePopUpMenu = document.createElement('ul');
    gamePopUp.appendChild(gamePopUpMenu);
    ['Resume', 'Save game', 'Sound: on', 'Solve', 'Main menu'].forEach((itemMenuName, indexMenu) => {
      const itemMenu = document.createElement('li');
      itemMenu.innerHTML = itemMenuName;
      switch (indexMenu) {
      case 0:
        itemMenu.addEventListener('click', () => {
          this.gamePopUp.className = setDisplay(this.gamePopUp, 'off');
          this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'on');
          this.gamePopUpButton.innerHTML = 'Pause';
          this.timeMoves.flagTime = true;
          this.timeMoves.stopwatch(this.timeMoves.countSeconds);
        });
        break;
      case 1:
        itemMenu.addEventListener('click', () => {
          if (itemMenu.innerHTML === 'Save game') {
            itemMenu.innerHTML = 'Game saved';
            const saveGame = {};
            saveGame.countSeconds = this.timeMoves.countSeconds;
            saveGame.countMoves = this.timeMoves.countMoves;
            saveGame.imageIndex = this.imageIndex;
            saveGame.displacementArr = this.displacementArr;
            saveGame.currentSolve = new Array(0);
            Array.from(this.gamePuzzle.children).forEach((element) => {
              const indexTop = +element.style.top.replace('px', '') / +element.style.height.replace('px', '');
              const indexLeft = +element.style.left.replace('px', '') / +element.style.width.replace('px', '');
              saveGame.currentSolve.push([indexTop, indexLeft]);
            });

            const arrayGames = localStorage.getItem('arrayGames') !== null ? JSON.parse(localStorage.getItem('arrayGames')) : new Array(0);
            arrayGames.push(saveGame);
            localStorage.setItem('arrayGames', JSON.stringify(arrayGames));
          }
        });
        break;
      case 2:
        itemMenu.addEventListener('click', () => {
          if (itemMenu.innerHTML === 'Sound: on') {
            itemMenu.innerHTML = 'Sound: off';
          } else {
            itemMenu.innerHTML = 'Sound: on';
          }
        });
        break;
      case 3:
        itemMenu.addEventListener('click', () => {
          this.gamePopUp.className = setDisplay(this.gamePopUp, 'off');
          this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'on');
          this.gamePopUpButton.innerHTML = 'Pause';
          this.timeMoves.flagTime = true;
          this.timeMoves.stopwatch(this.timeMoves.countSeconds);

          this.reverseSolve(this.displacementArr.length - 1);
        });
        break;
      default:
        itemMenu.addEventListener('click', () => {
          this.gameMenu.className = setDisplay(this.gameMenu, 'on');
          this.gamePopUp.className = setDisplay(this.gamePopUp, 'off');
          this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'off');
          this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'off');
          this.gamePopUpButton.innerHTML = 'Pause';
          this.gamePopUp.firstChild.children[1].innerHTML = 'Save game';

          this.displacementArr = new Array(0);
          this.timeMoves.countMoves = 0;
          this.timeMoves.countSeconds = 0;
        });
        break;
      }
      gamePopUpMenu.appendChild(itemMenu);
    });
  }

  createMenu() {
    const gameMenu = document.createElement('ul');
    gameMenu.className = 'game-menu';
    this.gameBoard.appendChild(gameMenu);
    this.fillMenu(gameMenu);
    return gameMenu;
  }

  fillMenu(gameMenu) {
    ['New game', 'Saved games', 'Best scores', 'Settings', 'Help'].forEach((itemMenuName, indexMenu) => {
      const itemMenu = document.createElement('li');
      itemMenu.innerHTML = itemMenuName;
      switch (indexMenu) {
      case 0:
        itemMenu.addEventListener('click', () => {
          this.gameMenu.className = setDisplay(this.gameMenu, 'off');
          this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'on');
          this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'on');
          this.createGame();
        });
        break;
      case 1:
        itemMenu.addEventListener('click', () => {
          this.gameMenu.className = setDisplay(this.gameMenu, 'off');
          this.gameLoad.className = setDisplay(this.gameLoad, 'on');
          this.fillLoad();
        });
        break;
      case 2:
        itemMenu.addEventListener('click', () => {
          this.gameMenu.className = setDisplay(this.gameMenu, 'off');
          this.gameScores.className = setDisplay(this.gameScores, 'on');
          this.fillScores();
        });
        break;
      case 3:
        itemMenu.addEventListener('click', () => {
          this.gameMenu.className = setDisplay(this.gameMenu, 'off');
          this.gameSettings.className = setDisplay(this.gameSettings, 'on');
        });
        break;
      default:
        itemMenu.addEventListener('click', () => {
          this.gameMenu.className = setDisplay(this.gameMenu, 'off');
          this.gameHelp.className = setDisplay(this.gameHelp, 'on');
        });
        break;
      }
      gameMenu.appendChild(itemMenu);
    });
  }

  createPuzzle() {
    const gamePuzzle = document.createElement('ul');
    gamePuzzle.className = 'game-puzzle display-none';
    this.gameBoard.appendChild(gamePuzzle);

    let prevActiveElement = null;
    gamePuzzle.addEventListener('dragstart', (element) => {
      const emptyElement = document.querySelector('.empty-mosaic');
      const dragImgEl = document.createElement('span');

      element.dataTransfer.setDragImage(dragImgEl, 0, 0);
      if (searchDiff(emptyElement, element.target) === 1) {
        element.target.classList.add('selected');
        if (prevActiveElement !== element.target) {
          if (prevActiveElement != null) {
            const prevel = prevActiveElement;
            prevel.classList.remove('selected');
          }
          prevActiveElement = element.target;
        }
      }
    });

    gamePuzzle.addEventListener('dragend', (element) => {
      element.target.classList.remove('selected');
    });

    gamePuzzle.addEventListener('dragenter', (element) => {
      element.preventDefault();
      const activeElement = gamePuzzle.querySelector('.selected');
      const emptyElement = document.querySelector('.empty-mosaic');

      if (emptyElement === element.target) {
        this.exchangeElements(activeElement, element.target);
      }
    });

    return gamePuzzle;
  }

  createGame() {
    const lengthLine = this.gameSettings.children[1].children[0].selectedIndex + 3;
    const numberOfMosaics = lengthLine ** 2;
    const puzzleWidth = (this.gameBoard.clientWidth / lengthLine).toFixed(3);
    const puzzleHeight = (this.gameBoard.clientHeight / lengthLine).toFixed(3);
    this.displacementArr = new Array(0);

    while (this.gamePuzzle.firstChild) {
      this.gamePuzzle.removeChild(this.gamePuzzle.firstChild);
    }

    if (this.gamePuzzle.className.indexOf('game-field-') !== -1) {
      this.gamePuzzle.className = this.gamePuzzle.className.replace(/[1-9]/, `${lengthLine}`);
    } else {
      this.gamePuzzle.classList.add(`game-field-${lengthLine}`);
    }

    for (let i = 0; i < numberOfMosaics; i += 1) {
      const mosaic = document.createElement('li');
      mosaic.id = `m${i}`;
      mosaic.classList.add('mosaic');
      mosaic.draggable = i !== numberOfMosaics - 1;
      // mosaic.innerHTML = i === numberOfMosaics - 1 ? '' : i + 1;

      mosaic.style.width = `${puzzleWidth}px`;
      mosaic.style.height = `${puzzleHeight}px`;

      const indexHeight = divInt(i, lengthLine);
      let indexWidth = i;
      while (indexWidth - (lengthLine - 1) > 0) {
        indexWidth -= lengthLine;
      }

      mosaic.style.top = `${puzzleHeight * indexHeight}px`;
      mosaic.style.left = `${puzzleWidth * indexWidth}px`;

      if (i === numberOfMosaics - 1) {
        mosaic.classList.add('empty-mosaic');
      } else {
        mosaic.addEventListener('click', () => {
          const emptyElement = document.querySelector('.empty-mosaic');
          if (searchDiff(emptyElement, mosaic) === 1) {
            this.exchangeElements(emptyElement, mosaic);
          }
        });
      }

      this.gamePuzzle.appendChild(mosaic);
    }

    this.imageIndex = getRandomInt(149);
    this.setBgImage(lengthLine, this.imageIndex);

    this.shufflePuzzle(lengthLine);

    this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'on');
    this.timeMoves.countSeconds = 0;
    this.timeMoves.flagTime = true;
    this.timeMoves.stopwatch(this.timeMoves.countSeconds);

    this.timeMoves.countMoves = 0;
    this.timeMoves.sectionTimeMoves.lastChild.innerHTML = `Moves:${this.timeMoves.countMoves}`;
  }

  createLoad() {
    const gameLoad = document.createElement('ul');
    gameLoad.className = 'game-load display-none';
    this.gameBoard.appendChild(gameLoad);

    return gameLoad;
  }

  fillLoad() {
    while (this.gameLoad.firstChild) {
      this.gameLoad.removeChild(this.gameLoad.firstChild);
    }

    const arrayGames = localStorage.getItem('arrayGames') != null ? JSON.parse(localStorage.getItem('arrayGames')) : new Array(0);
    arrayGames.forEach((element) => {
      const itemLoad = document.createElement('li');
      itemLoad.innerHTML = `Sec: ${element.countSeconds} Moves: ${element.countMoves}`;
      this.gameLoad.appendChild(itemLoad);

      itemLoad.addEventListener('click', () => {
        this.loadGame(element);
        this.gameLoad.className = setDisplay(this.gameLoad, 'off');
        this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'on');
        this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'on');
      });
    });
    if (arrayGames.length === 0) {
      const itemInfo = document.createElement('li');
      itemInfo.innerHTML = 'Сохраненных игр еще нет';
      this.gameLoad.appendChild(itemInfo);
    }
    const itemBack = document.createElement('li');
    itemBack.innerHTML = 'Main menu';
    itemBack.addEventListener('click', () => {
      this.gameLoad.className = setDisplay(this.gameLoad, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
    });
    this.gameLoad.appendChild(itemBack);
  }

  loadGame(loadGameObj) {
    const currentGame = loadGameObj.currentSolve;
    const lengthLine = currentGame.length ** 0.5;
    const numberOfMosaics = lengthLine ** 2;
    const puzzleWidth = (this.gameBoard.clientWidth / lengthLine).toFixed(3);
    const puzzleHeight = (this.gameBoard.clientHeight / lengthLine).toFixed(3);

    while (this.gamePuzzle.firstChild) {
      this.gamePuzzle.removeChild(this.gamePuzzle.firstChild);
    }

    if (this.gamePuzzle.className.indexOf('game-field-') !== -1) {
      this.gamePuzzle.className = this.gamePuzzle.className.replace(/[1-9]/, `${lengthLine}`);
    } else {
      this.gamePuzzle.classList.add(`game-field-${lengthLine}`);
    }

    currentGame.forEach((arrayPos, index) => {
      const mosaic = document.createElement('li');
      mosaic.id = `m${index}`;
      mosaic.classList.add('mosaic');
      mosaic.draggable = index !== numberOfMosaics - 1;
      // mosaic.innerHTML = index === numberOfMosaics - 1 ? '' : index + 1;

      mosaic.style.width = `${puzzleWidth}px`;
      mosaic.style.height = `${puzzleHeight}px`;

      const indexHeight = arrayPos[0];
      const indexWidth = arrayPos[1];
      mosaic.style.top = `${puzzleHeight * indexHeight}px`;
      mosaic.style.left = `${puzzleWidth * indexWidth}px`;

      if (index === numberOfMosaics - 1) {
        mosaic.classList.add('empty-mosaic');
      } else {
        mosaic.addEventListener('click', () => {
          const emptyElement = document.querySelector('.empty-mosaic');
          if (searchDiff(emptyElement, mosaic) === 1) {
            this.exchangeElements(emptyElement, mosaic);
          }
        });
      }

      this.gamePuzzle.appendChild(mosaic);
    });
    this.displacementArr = loadGameObj.displacementArr;

    this.imageIndex = loadGameObj.imageIndex;
    this.setBgImage(lengthLine, this.imageIndex);

    this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'on');
    this.timeMoves.countSeconds = loadGameObj.countSeconds;
    this.timeMoves.flagTime = true;
    this.timeMoves.stopwatch(this.timeMoves.countSeconds);

    this.timeMoves.countMoves = loadGameObj.countMoves;
    this.timeMoves.sectionTimeMoves.lastChild.innerHTML = `Moves:${this.timeMoves.countMoves}`;
  }

  createScores() {
    const gameScores = document.createElement('ul');
    gameScores.className = 'game-scores display-none';
    this.gameBoard.appendChild(gameScores);

    return gameScores;
  }

  updateScores() {
    const loadScoresObj = localStorage.getItem('arrayScores') != null ? JSON.parse(localStorage.getItem('arrayScores')) : new Array(0);
    const saveScore = {};
    saveScore.countSeconds = this.timeMoves.countSeconds;
    saveScore.countMoves = this.timeMoves.countMoves;
    saveScore.name = localStorage.getItem('enterName') === '[ Введите имя ]' ? 'Аноним' : localStorage.getItem('enterName');
    saveScore.complexity = this.gamePuzzle.children.length ** 0.5;
    if (loadScoresObj.length === 0) {
      loadScoresObj.push(saveScore);
    } else {
      loadScoresObj.push(saveScore);
      loadScoresObj.sort((objA, objB) => objA.countMoves - objB.countMoves);
      if (loadScoresObj.length > 10) {
        loadScoresObj.pop();
      }
    }
    localStorage.setItem('arrayScores', JSON.stringify(loadScoresObj));
  }

  fillScores() {
    while (this.gameScores.firstChild) {
      this.gameScores.removeChild(this.gameScores.firstChild);
    }

    const loadScoresObj = localStorage.getItem('arrayScores') != null ? JSON.parse(localStorage.getItem('arrayScores')) : new Array(0);
    if (loadScoresObj.length === 0) {
      const itemNone = document.createElement('li');
      itemNone.innerHTML = 'Лидеров еще нет';
      this.gameScores.appendChild(itemNone);
    } else {
      loadScoresObj.forEach((scoreObj, indexObj) => {
        const itemObj = document.createElement('li');
        itemObj.innerHTML = `${indexObj + 1}. ${scoreObj.name} - ${scoreObj.countMoves}(${scoreObj.complexity}x${scoreObj.complexity}) за ${timeConversion(scoreObj.countSeconds)}`;
        this.gameScores.appendChild(itemObj);
      });
    }

    const itemBack = document.createElement('li');
    itemBack.innerHTML = 'Main menu';
    itemBack.addEventListener('click', () => {
      this.gameScores.className = setDisplay(this.gameScores, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
    });
    this.gameScores.appendChild(itemBack);
  }

  createSettings() {
    const gameSettings = document.createElement('ul');
    gameSettings.className = 'game-settings display-none';
    this.gameBoard.appendChild(gameSettings);

    this.fillSettings(gameSettings);

    return gameSettings;
  }

  fillSettings(gameSettings) {
    const settingsSelect = document.createElement('select');
    settingsSelect.className = 'game-settings-select';

    ['Choose the difficulty:', '', 'Main menu'].forEach((itemSettingsName, indexSettings) => {
      const itemSettings = document.createElement('li');

      if (itemSettingsName === '') {
        ['3x3', '4x4', '5x5', '6x6', '7x7', '8x8'].forEach((itemSelectName) => {
          const itemSelect = document.createElement('option');
          itemSelect.innerHTML = itemSelectName;
          if (itemSelectName === '4x4') {
            itemSelect.setAttribute('selected', true);
          }
          settingsSelect.appendChild(itemSelect);
        });
        itemSettings.appendChild(settingsSelect);
      } else {
        itemSettings.innerHTML = itemSettingsName;
      }

      if (indexSettings === 2) {
        itemSettings.addEventListener('click', () => {
          this.gameSettings.className = setDisplay(this.gameSettings, 'off');
          this.gameMenu.className = setDisplay(this.gameMenu, 'on');
        });
      }

      gameSettings.appendChild(itemSettings);
    });
  }

  createHelp() {
    const gameHelp = document.createElement('ul');
    gameHelp.className = 'game-settings display-none';
    this.gameBoard.appendChild(gameHelp);

    this.fillHelp(gameHelp);

    return gameHelp;
  }

  fillHelp(gameHelp) {
    ['1. Сохранение игры - "Save game"', '2. Отключение звука - "Sound on"', '3. Решение компом -  "Solve"'].forEach((elementName) => {
      const itemElement = document.createElement('li');
      itemElement.innerHTML = elementName;
      gameHelp.appendChild(itemElement);
    });

    const itemBack = document.createElement('li');
    itemBack.innerHTML = 'Main menu';
    itemBack.addEventListener('click', () => {
      gameHelp.className = setDisplay(gameHelp, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
    });
    gameHelp.appendChild(itemBack);
  }

  exchangeElements(empty, fill, flag = true) {
    if (empty && fill) {
      const clonedElement1 = empty.cloneNode(true);
      const clonedElement2 = fill.cloneNode(true);

      fill.style.left = clonedElement1.style.left;
      fill.style.top = clonedElement1.style.top;

      empty.style.left = clonedElement2.style.left;
      empty.style.top = clonedElement2.style.top;

      if (document.body.querySelector('.section-timemove') != null) {
        this.timeMoves.changeMoves();
        if (flag) {
          if (fill.id !== this.displacementArr[this.displacementArr.length - 1]) {
            this.displacementArr.push(fill.id);
          } else {
            this.displacementArr.pop();
          }
        }
      }

      if (this.gamePopUp.firstChild.children[2].innerHTML === 'Sound: on' && this.timeMoves.flagTime) {
        setSoundKey(5, 'square');
      }

      if (this.solutionCheck.solveFlag && this.solutionCheck.checkSolve(empty)) {
        this.timeMoves.flagTime = false;
        Array.from(this.gamePuzzle.children).forEach((element) => {
          element.classList.add('opacity-none');
        });
        this.gamePuzzle.style.backgroundImage = `url('assets/images/box/${this.imageIndex}.jpg')`;
        this.createWin();
      }
    }
  }

  createWin() {
    const blackout = document.createElement('section');
    blackout.classList.add('blackout');
    document.body.appendChild(blackout);

    const sectionWin = document.createElement('section');
    sectionWin.classList.add('section-win');
    if (window.innerWidth > window.innerHeight) {
      sectionWin.style.width = `${window.innerHeight * 0.6}px`;
      sectionWin.style.height = `${window.innerHeight * 0.6}px`;
    } else {
      sectionWin.style.width = `${window.innerWidth * 0.6}px`;
      sectionWin.style.height = `${window.innerWidth * 0.6}px`;
    }
    sectionWin.style.left = `${(window.innerWidth - sectionWin.style.width.replace('px', '')) / 2}px`;
    sectionWin.style.top = '0px';
    document.body.appendChild(sectionWin);

    const listWin = document.createElement('ul');
    listWin.classList.add('section-ul');
    sectionWin.appendChild(listWin);
    listWin.style.width = `${+sectionWin.style.width.replace('px', '') * 0.9}px`;
    listWin.style.height = `${+sectionWin.style.height.replace('px', '') * 0.265}px`;
    listWin.style.fontSize = `${+listWin.style.height.replace('px', '') * 0.2}px`;
    listWin.style.marginBottom = `${+listWin.style.height.replace('px', '') * 0.2}px`;

    const messageWin = document.createElement('li');
    messageWin.classList.add('message-win');
    messageWin.innerHTML = `Ура! Вы решили головоломку за ${this.timeMoves.sectionTimeMoves.firstChild.innerHTML.slice(6)} и ${this.timeMoves.countMoves} ходов`;
    listWin.appendChild(messageWin);

    const enterName = document.createElement('li');
    enterName.classList.add('enter-name');
    if (localStorage.getItem('enterName') === null) {
      localStorage.setItem('enterName', '[ Введите имя ]');
    }
    enterName.innerHTML = localStorage.getItem('enterName');
    enterName.contentEditable = true;

    enterName.addEventListener('click', () => {
      enterName.innerHTML = '';
    });
    enterName.addEventListener('keypress', (e) => {
      if (e.which === 13 || e.keyCode === 13) {
        if (enterName.textContent === '') {
          enterName.textContent = localStorage.getItem('enterName');
        } else {
          localStorage.setItem('enterName', e.target.innerText);
        }
        enterName.blur();
      }
    });
    enterName.addEventListener('blur', (e) => {
      if (enterName.textContent === '') {
        enterName.textContent = localStorage.getItem('enterName');
      } else {
        localStorage.setItem('enterName', e.target.innerText);
      }
    });

    listWin.appendChild(enterName);

    const goBack = document.createElement('li');
    goBack.classList.add('back');
    goBack.innerHTML = 'Main menu';
    listWin.appendChild(goBack);

    goBack.addEventListener('click', () => {
      this.gamePuzzle.style.backgroundImage = '';
      this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
      this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'off');
      this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'off');
      this.gamePopUpButton.innerHTML = 'Pause';
      this.gamePopUp.firstChild.children[1].innerHTML = 'Save game';
      this.updateScores();

      this.displacementArr = new Array(0);
      this.timeMoves.countMoves = 0;
      this.timeMoves.countSeconds = 0;

      document.body.removeChild(blackout);
      document.body.removeChild(sectionWin);
    });

    blackout.addEventListener('click', () => {
      this.gamePuzzle.style.backgroundImage = '';
      this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
      this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'off');
      this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'off');
      this.gamePopUpButton.innerHTML = 'Pause';
      this.gamePopUp.firstChild.children[1].innerHTML = 'Save game';
      this.updateScores();

      this.displacementArr = new Array(0);
      this.timeMoves.countMoves = 0;
      this.timeMoves.countSeconds = 0;

      document.body.removeChild(blackout);
      document.body.removeChild(sectionWin);
    });
    /*
    const blackout = document.createElement('section');
    blackout.classList.add('blackout');
    document.body.appendChild(blackout);

    const sectionWin = document.createElement('section');
    sectionWin.classList.add('section-win');
    if (window.innerWidth > window.innerHeight) {
      sectionWin.style.width = `${window.innerHeight * 0.5}px`;
      sectionWin.style.height = `${window.innerHeight * 0.5}px`;
    } else {
      sectionWin.style.width = `${window.innerWidth * 0.5}px`;
      sectionWin.style.height = `${window.innerWidth * 0.5}px`;
    }
    sectionWin.style.fontSize = `${+sectionWin.style.height.replace('px', '') * 0.1}px`;
    sectionWin.style.left = `${(window.innerWidth - sectionWin.style.width.replace('px', '')) / 2}px`;
    sectionWin.style.top = `${(window.innerHeight - sectionWin.style.height.replace('px', '')) / 2}px`;
    document.body.appendChild(sectionWin);

    const messageWin = document.createElement('div');
    messageWin.classList.add('message-win');
    messageWin.innerHTML = `Ура! Вы решили головоломку за ${this.timeMoves.sectionTimeMoves.firstChild.innerHTML.slice(6)} и ${this.timeMoves.countMoves} ходов`;
    sectionWin.appendChild(messageWin);

    const goBack = document.createElement('a');
    goBack.classList.add('back');
    goBack.innerHTML = 'Main menu';
    sectionWin.appendChild(goBack);

    this.updateScores();
    goBack.addEventListener('click', () => {
      this.gamePuzzle.style.backgroundImage = '';
      this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
      this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'off');
      this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'off');
      this.gamePopUpButton.innerHTML = 'Pause';
      this.gamePopUp.firstChild.children[1].innerHTML = 'Save game';

      this.displacementArr = new Array(0);
      this.timeMoves.countMoves = 0;
      this.timeMoves.countSeconds = 0;

      document.body.removeChild(blackout);
      document.body.removeChild(sectionWin);
    });

    blackout.addEventListener('click', () => {
      this.gamePuzzle.style.backgroundImage = '';
      this.gamePuzzle.className = setDisplay(this.gamePuzzle, 'off');
      this.gameMenu.className = setDisplay(this.gameMenu, 'on');
      this.gamePopUpButton.className = setDisplay(this.gamePopUpButton, 'off');
      this.timeMoves.sectionTimeMoves.className = setDisplay(this.timeMoves.sectionTimeMoves, 'off');
      this.gamePopUpButton.innerHTML = 'Pause';
      this.gamePopUp.firstChild.children[1].innerHTML = 'Save game';

      this.displacementArr = new Array(0);
      this.timeMoves.countMoves = 0;
      this.timeMoves.countSeconds = 0;

      document.body.removeChild(blackout);
      document.body.removeChild(sectionWin);
    }); */
  }

  resizeDisplay() {
    this.setBoardSize();
    this.setFontSize();
    if (this.gamePuzzle.className.indexOf('display-none') === -1) {
      const lengthLine = this.gameSettings.children[1].children[0].selectedIndex + 3;
      const puzzleWidth = this.gameBoard.clientWidth / lengthLine;
      const puzzleHeight = this.gameBoard.clientHeight / lengthLine;

      const emptyElement = document.querySelector('.empty-mosaic');
      const diffLeft = +emptyElement.style.width.replace('px', '') / puzzleWidth;
      const diffTop = +emptyElement.style.height.replace('px', '') / puzzleHeight;

      Array.from(this.gamePuzzle.children).forEach((mosaic) => {
        mosaic.style.width = `${puzzleWidth}px`;
        mosaic.style.height = `${puzzleHeight}px`;

        mosaic.style.top = `${+mosaic.style.top.replace('px', '') / diffTop}px`;
        mosaic.style.left = `${+mosaic.style.left.replace('px', '') / diffLeft}px`;
      });

      this.setBgImage(lengthLine, this.imageIndex);
    }
  }

  reverseSolve(i) {
    setTimeout(() => {
      if (this.displacementArr.length && this.gamePopUpButton.innerHTML === 'Pause') {
        this.exchangeElements(document.querySelector('.empty-mosaic'), this.gamePuzzle.querySelector(`#${this.displacementArr[i]}`), false);
        this.displacementArr.pop();
        this.reverseSolve(this.displacementArr.length - 1);
      }
    }, 500);
  }

  setBgImage(lengthLine, imageIndex) {
    Array.from(this.gamePuzzle.children).forEach((element, index) => {
      if (index !== Array.from(this.gamePuzzle.children).length - 1) {
        const image = `url('assets/images/box/${imageIndex}.jpg')`;
        element.style.backgroundImage = image;
        element.style.backgroundRepeat = 'no-repeat';
        element.style.backgroundSize = `${this.gameBoard.clientWidth}px ${this.gameBoard.clientHeight}px`;

        const indexHeight = divInt(index, lengthLine);
        let indexWidth = index;
        while (indexWidth - (lengthLine - 1) > 0) {
          indexWidth -= lengthLine;
        }

        element.style.backgroundPositionX = `${+element.style.width.replace('px', '') * -indexWidth}px`;
        element.style.backgroundPositionY = `${+element.style.height.replace('px', '') * -indexHeight}px`;
      }
    });
  }

  shufflePuzzle(lengthLine) {
    this.solutionCheck.solveFlag = false;

    for (let i = 0; i < 10 * ((lengthLine - 2) ** 2); i += 1) {
      const emptyElement = document.querySelector('.empty-mosaic');
      const countArr = new Array(0);
      const lengthDisplace = this.displacementArr.length;

      Array.from(this.gamePuzzle.children).forEach((element) => {
        if (searchDiff(emptyElement, element) === 1) {
          if ((lengthDisplace !== 0 && element !== this.gamePuzzle.querySelector(`#${this.displacementArr[lengthDisplace - 1]}`)) || lengthDisplace === 0) {
            countArr.push(element);
          }
        }
      });

      const movableElement = countArr[getRandomInt(countArr.length)];
      this.exchangeElements(emptyElement, movableElement);
    }

    this.solutionCheck.solveFlag = true;
  }
}

export default Puzzle;
