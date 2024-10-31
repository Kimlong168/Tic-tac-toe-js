const boxes = document.getElementsByClassName("box");
const playerA = document.getElementById("player-A");
const playerB = document.getElementById("player-B");
const gameDraw = document.getElementById("game-draw");
const btnBack = document.getElementById("btn-back");
const btnNewGame = document.getElementById("btn-new-game");
const lightMode1 = document.getElementById("flexSwitchCheckDefault1");
const music1 = document.getElementById("music1");

let turn = 0;
let count = 0;
let result = [
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
];

lightMode1.addEventListener("click", () => {
  if (lightMode1.checked) {
    document.body.classList.add("bg-light");
    document.body.classList.add("text-dark");
    document.body.classList.remove("bg-dark");
    document.body.classList.remove("text-light");
    document.getElementById("game-board").classList.add("bg-light");
    document.getElementById("game-board").classList.remove("bg-dark");
  } else {
    document.body.classList.remove("bg-light");
    document.body.classList.add("bg-dark");
    document.body.classList.add("text-light");
    document.body.classList.remove("text-dark");
    document.getElementById("game-board").classList.remove("bg-light");
    document.getElementById("game-board").classList.add("bg-dark");
  }
});

music1.addEventListener("click", () => {
  if (music1.checked) {
    document.getElementById("myAudio").play();
  } else {
    document.getElementById("myAudio").pause();
  }
});

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    if (this.innerHTML.trim() == "" && turn == 0) {
      count++;
      this.innerHTML = "&#10060;";
      turn = 1;
      playerB.classList.add("text-warning", "bg-success");
      playerA.classList.remove("text-warning", "bg-success");

      if (i < 3) result[0][i] = 0;
      else if (i < 6) result[1][i - 3] = 0;
      else result[2][i - 6] = 0;

      if (findWinner(whoWin)) return;

      setTimeout(() => {
        const computerMove = findBestMove();
        if (computerMove !== -1) {
          count++;
          boxes[computerMove].innerHTML = "&#11093;";
          playerA.classList.add("text-warning", "bg-success");
          playerB.classList.remove("text-warning", "bg-success");
          turn = 0;

          const row = Math.floor(computerMove / 3);
          const col = computerMove % 3;
          result[row][col] = 1;

          findWinner(whoWin);
        }
      }, 100);
    }
  });
}

function findBestMove() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (result[row][col] !== 0 && result[row][col] !== 1) {
        result[row][col] = 1;
        if (isWinningMove(1)) {
          result[row][col] = row * 3 + col + 11;
          return row * 3 + col;
        }
        result[row][col] = row * 3 + col + 11;
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (result[row][col] !== 0 && result[row][col] !== 1) {
        result[row][col] = 0;
        if (isWinningMove(0)) {
          result[row][col] = row * 3 + col + 11;
          return row * 3 + col;
        }
        result[row][col] = row * 3 + col + 11;
      }
    }
  }

  if (result[1][1] !== 0 && result[1][1] !== 1) return 4;

  const corners = [0, 2, 6, 8];
  for (let i = 0; i < corners.length; i++) {
    let row = Math.floor(corners[i] / 3);
    let col = corners[i] % 3;
    if (result[row][col] !== 0 && result[row][col] !== 1) {
      return corners[i];
    }
  }

  for (let i = 0; i < 9; i++) {
    let row = Math.floor(i / 3);
    let col = i % 3;
    if (result[row][col] !== 0 && result[row][col] !== 1) {
      return i;
    }
  }

  return -1;
}

function isWinningMove(player) {
  return (
    (result[0][0] === player &&
      result[0][1] === player &&
      result[0][2] === player) ||
    (result[1][0] === player &&
      result[1][1] === player &&
      result[1][2] === player) ||
    (result[2][0] === player &&
      result[2][1] === player &&
      result[2][2] === player) ||
    (result[0][0] === player &&
      result[1][0] === player &&
      result[2][0] === player) ||
    (result[0][1] === player &&
      result[1][1] === player &&
      result[2][1] === player) ||
    (result[0][2] === player &&
      result[1][2] === player &&
      result[2][2] === player) ||
    (result[0][0] === player &&
      result[1][1] === player &&
      result[2][2] === player) ||
    (result[0][2] === player &&
      result[1][1] === player &&
      result[2][0] === player)
  );
}

function findWinner() {
  if (isWinningMove(0)) {
    whoWin(0); // Call whoWin with Player A as the winner
    return true;
  } else if (isWinningMove(1)) {
    whoWin(1); // Call whoWin with the computer as the winner
    return true;
  } else if (count === 9) {
    // Draw condition
    gameDraw.innerHTML = "Game Draw";
    return true;
  }
  return false;
}

function whoWin(winner) {
  document.getElementById("winner").innerHTML =
    winner === 0 ? "You Win!" : "Computer Wins!";
  document.getElementById("win").classList.remove("d-none");
  document.getElementById("game-board").style.pointerEvents = "none"; // Disable further moves
}

btnNewGame.addEventListener("click", function () {
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
  }
  document.getElementById("game-board").style.pointerEvents = "auto";
  document.getElementById("win").classList.add("d-none");
  playerA.classList.add("text-warning", "bg-success");
  playerB.classList.remove("text-warning", "bg-success");
  gameDraw.innerHTML = "";
  turn = 0;
  count = 0;
  result = [
    [11, 12, 13],
    [14, 15, 16],
    [17, 18, 19],
  ];
});

btnBack.addEventListener("click", function () {
  window.close();
});
