let gameBoard, user = 'X', ai = 'O';
const cells = document.querySelectorAll('.cell');
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [6, 4, 2], [2, 5, 8], [1, 4, 7], [0, 3, 6]];

startGame();

function startGame() {
  document.getElementById('game-board').style.display = 'none';
  document.querySelector('.endgame').style.display = 'none';
  document.querySelector('.endgame .text').innerText = "";
  document.querySelector('.selections').style.display = 'block';
    
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = '';
    cells[i].style.removeProperty('background-color');
  }
}

function charSelect(char) {
  user = char;
  ai = (char === 'X') ? 'O' : 'X';
  
  gameBoard = Array.from(Array(9).keys());
  
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleClick, false);
  }
  
  if (ai === 'X') {
    turn(bestSpot(), ai);
  }
  
  document.getElementById('char-selection').classList.add('fadeOut');
  setTimeout(() => document.querySelector('.selections').style.display = 'none', 100);
  document.getElementById('game-board').style.display = 'block';
}

function handleClick(gameSpace) {
  if (typeof gameBoard[gameSpace.target.id] === 'number') {
    turn(gameSpace.target.id, user);
    if (!checkWin(gameBoard, user) && !checkTie()) {
      setTimeout( () => turn(bestSpot(), ai), 1000);
    }
  }
}

function turn(spaceId, player) {
  gameBoard[spaceId] = player;
  document.getElementById(spaceId).innerHTML = player;
  let gameWon = checkWin(gameBoard, player);
  if (gameWon) {
    gameOver(gameWon);
  }
  checkTie();
  changeIndicator(player);
}

function checkWin(board, player) {
  let spaces = board.reduce((acc, ele, idx) => (ele === player) ? acc.concat(idx) : acc, []);
  let gameWon = null;
  
  for (let [index, winComboSpaces] of winCombos.entries()) {
    if (winComboSpaces.every(elem => spaces.indexOf(elem) > -1)) {
      gameWon = {index: index, player: player};
      break;
    }
  }
  return gameWon;
}

function gameOver(gameWon){
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player === user ? "blue" : "red";
  }
  
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', handleClick, false);
  }
  
  declareWinner(gameWon.player === user ? "You win!" : "You lose");
}

function declareWinner(who) {
  document.querySelector(".endgame").style.display = "block";
  document.querySelector(".endgame .text").innerText = who;
  
}

function emptySquares() {
  return gameBoard.filter((elm, i) => i === elm);
}

function bestSpot(){
  return minMax(gameBoard, ai).index;
}

function checkTie() {
  if (emptySquares().length === 0) {
    document.getElementById('char-selection').classList.remove('fadeOut');
    document.getElementById('end-display').style.display = 'block';
    for (cell of cells) {
      //cell.style.backgroundColor = "green";
      cell.removeEventListener('click', handleClick, false);
    }
    declareWinner("Tie game");
    return true;
  }
  return false;
}

function minMax(testBoard, player) {
  var openSpaces = emptySquares(testBoard);
  
  if (checkWin(testBoard, user)) {
    return {score: -10};
  } else if (checkWin(testBoard, ai)) {
    return {score: 10};
  } else if (openSpaces.length === 0) {
    return {score: 0};
  }
  
  var moves = [];
  
  for (let i = 0; i < openSpaces.length; i++) {
    var move = {};
    move.index = testBoard[openSpaces[i]];
    testBoard[openSpaces[i]] = player;
    
    if (player === ai) 
      move.score = minMax(testBoard, user).score;
    else
      move.score =  minMax(testBoard, ai).score;
      testBoard[openSpaces[i]] = move.index;
    if ((player === ai && move.score === 10) || (player === user && move.score === -10))
      return move;
    else
      moves.push(move);
  }
  
  let bestMove, bestScore;
  
  if (player === ai) {
    bestScore = -1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    bestScore = 1000;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }  
  return moves[bestMove];
}

function changeIndicator(player) {
  var removeId, addId;
  (player === 'X') ? (removeId = 'x-turn', addId = 'o-turn') : (removeId = 'o-turn', addId = 'x-turn');
  document.getElementById(removeId).classList.remove('btn-success');
  document.getElementById(removeId).classList.add('btn-secondary');
  document.getElementById(addId).classList.add('btn-success');
}