
const boxes = document.getElementsByClassName("box");
const playerA = document.getElementById("player-A");
const playerB = document.getElementById("player-B");
const btnBack = document.getElementById("btn-back");
const btnNewGame = document.getElementById("btn-new-game");
const lightMode = document.getElementById("flexSwitchCheckDefault");
const music = document.getElementById("music");
let turn = 0;
let result = [
  [11, 12, 13],
  [14, 15, 16],
  [17, 18, 19],
];
let winner = false;

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    if (this.innerHTML.trim() == "" && turn == 0) {
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
    } else if (this.innerHTML.trim() == "" && turn == 1) {
      this.innerHTML = "&#11093;";
      turn = 0;
      playerA.classList.add("text-warning");
      playerA.classList.add("bg-success");
      playerB.classList.remove("text-warning");
      playerB.classList.remove("bg-success");
      if (i < 3) {
        result[0][i] = 1;
      } else if (i < 6) {
        result[1][i - 3] = 1;
      } else {
        result[2][i - 6] = 1;
      }
    }

    // check for winner
    if (result[0][0] == result[0][1] && result[0][1] == result[0][2]) {
      winner = true;
    } else if (
      result[1][0] == result[1][1] &&
      result[1][1] == result[1][2]
    ) {
      winner = true;
    } else if (
      result[2][0] == result[2][1] &&
      result[2][1] == result[2][2]
    ) {
      winner = true;
    } else if (
      result[0][0] == result[1][0] &&
      result[1][0] == result[2][0]
    ) {
      winner = true;
    } else if (
      result[0][1] == result[1][1] &&
      result[1][1] == result[2][1]
    ) {
      winner = true;
    } else if (
      result[0][2] == result[1][2] &&
      result[1][2] == result[2][2]
    ) {
      winner = true;
    } else if (
      result[0][0] == result[1][1] &&
      result[1][1] == result[2][2]
    ) {
      winner = true;
    } else if (
      result[0][2] == result[1][1] &&
      result[1][1] == result[2][0]
    ) {
      winner = true;
    } else if (
      result[0][0] != 11 &&
      result[0][1] != 12 &&
      result[0][2] != 13 &&
      result[1][0] != 14 &&
      result[1][1] != 15 &&
      result[1][2] != 16 &&
      result[2][0] != 17 &&
      result[2][1] != 18 &&
      result[2][2] != 19
    ) {
      document.getElementById("win").classList.remove("d-none");
      document.getElementById("win").innerHTML = "Game Draw";
      document.getElementById("win").classList.remove("text-danger");
      document.getElementById("win").classList.add("text-warning");
    }

    if (winner) {
      if (turn == 1) {
        document.getElementById("winner").innerHTML = "Player A";
        document.getElementById("win").classList.remove("d-none");
      } else {
        document.getElementById("winner").innerHTML = "Player B";
        document.getElementById("win").classList.remove("d-none");
      }
      document.getElementById("game-board").style.pointerEvents = "none";
    }
  });
}

btnNewGame.addEventListener("click", function () {
  var i=0;
  setInterval(()=>{
    if(boxes[i].innerHTML.trim() != "")
    boxes[i].innerHTML = "";
    i++;
  },100);
  

  document.getElementById("game-board").style.pointerEvents = "auto";
  document.getElementById("win").classList.add("d-none");

  playerA.classList.add("text-warning");
  playerA.classList.add("bg-success");
  playerB.classList.remove("text-warning");
  playerB.classList.remove("bg-success");

  turn = 0;
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

lightMode.addEventListener("click", () => {
  if (lightMode.checked) {
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

music.addEventListener("click", () => {
  if (music.checked) {
    document.getElementById("myAudio").play();
  } else {
    document.getElementById("myAudio").pause();
  }
});
