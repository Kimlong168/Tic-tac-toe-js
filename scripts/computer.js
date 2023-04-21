
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
  console.log("test");
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
      playerB.classList.add("text-warning");
      playerB.classList.add("bg-success");
      playerA.classList.remove("text-warning");
      playerA.classList.remove("bg-success");
      if (i < 3) {
        result[0][i] = 0;
      } else if (i < 6) {
        result[1][i - 3] = 0;
      } else {
        result[2][i - 6] = 0;
      }
      document.getElementById("game-board").style.pointerEvents = "none";
      // check for winner
      if (findWinner(whoWin)) {
        return;
      }

    }else{
      return;
    }

    while(true) {
      let random = Math.floor(Math.random() * 9);
      if (boxes[random].innerHTML.trim() == "") {

        count++;

        setTimeout(()=>{
          boxes[random].innerHTML = "&#11093;";
          playerA.classList.add("text-warning");
          playerA.classList.add("bg-success");
          playerB.classList.remove("text-warning");
          playerB.classList.remove("bg-success");
        },100);

        turn = 0;

        if (random < 3) {
          result[0][random] = 1;
        } else if (random < 6) {
          result[1][random - 3] = 1;
        } else {
          result[2][random - 6] = 1;
        }
        document.getElementById("game-board").style.pointerEvents = "auto";

        // check for winner
        if (findWinner(whoWin)) {
          return;
        }

        break;
      }
    }


  });
}

function findWinner(whoWin) {
  if (result[0][0] == result[0][1] && result[0][1] == result[0][2]) {
    whoWin(result[0][0]);
  } else if (
    result[1][0] == result[1][1] &&
    result[1][1] == result[1][2]
  ) {
    whoWin(result[1][0]);
  } else if (
    result[2][0] == result[2][1] &&
    result[2][1] == result[2][2]
  ) {
    whoWin(result[2][0]);
  } else if (
    result[0][0] == result[1][0] &&
    result[1][0] == result[2][0]
  ) {
    whoWin(result[0][0]);
  } else if (
    result[0][1] == result[1][1] &&
    result[1][1] == result[2][1]
  ) {
    whoWin(result[0][1]);
  } else if (
    result[0][2] == result[1][2] &&
    result[1][2] == result[2][2]
  ) {
    whoWin(result[0][2]);
  } else if (
    result[0][0] == result[1][1] &&
    result[1][1] == result[2][2]
  ) {
    whoWin(result[0][0]);
  } else if (
    result[0][2] == result[1][1] &&
    result[1][1] == result[2][0]
  ) {
    whoWin(result[0][2]);
  } else if (count == 9) {
    gameDraw.innerHTML = "Game Draw";
  } else {
    return false;
  }

  return true;
}

function whoWin(winner) {
  if (winner == 0) {
    document.getElementById("winner").innerHTML = "You";
    document.getElementById("win").classList.remove("d-none");
  } else {
    document.getElementById("winner").innerHTML = "Computer";
    document.getElementById("win").classList.remove("d-none");
  }
  document.getElementById("game-board").style.pointerEvents = "none";
}




btnNewGame.addEventListener("click", function () {
  var i = 0;
  setInterval(() => {
    if (boxes[i].innerHTML.trim() != "")
      boxes[i].innerHTML = "";
    i++;
  }, 100);

  // window.location.reload();

  document.getElementById("game-board").style.pointerEvents = "auto";
  document.getElementById("win").classList.add("d-none");

  playerA.classList.add("text-warning");
  playerA.classList.add("bg-success");
  playerB.classList.remove("text-warning");
  playerB.classList.remove("bg-success");
  gameDraw.innerHTML = "";

  turn = 0;
  count = 0;
  winner = false;
  result = [
    [11, 12, 13],
    [14, 15, 16],
    [17, 18, 19],
  ];
});

btnBack.addEventListener("click", function () {
  var win = window.open(
    "",
    "_self"
  ); /* url = "" or "about:blank"; target="_self" */
  win.close();
});
