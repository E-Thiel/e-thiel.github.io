const board = document.querySelector("div.board");
const restartBtn = document.querySelector("button.restart");
const message = document.querySelector("p.message");
const body = document.querySelector("body");


const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playedCells = {
  0: "",
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
};
const x = [];
const o = [];

message.innerHTML = "It's up to X to make the first move!";

//create cells

let cell = document.createElement("div");
cell.setAttribute("class", "cell");

for (let i = 0; i < 9; i++) {
  board.appendChild(cell.cloneNode(true));
}

//select cells

const allCells = document.querySelectorAll("div.cell");

let gameOver = false;

const winChecker = (player, playerName) => {
  let cellStorage0 = [];
  let cellStorage1 = [];
  let cellStorage2 = [];
  for (let i = 0; i < winCombinations.length; i++) {
    cellStorage0.push(player.includes(winCombinations[i][0]));
    cellStorage1.push(player.includes(winCombinations[i][1]));
    cellStorage2.push(player.includes(winCombinations[i][2]));
    if (
      cellStorage0[i] === true &&
      cellStorage1[i] === true &&
      cellStorage2[i] === true
    ) {
      alert("We have a weiner! Congratulations " + playerName + "!");
      gameOver = true;
      message.innerHTML =
        '<span style="color:green">' +
        playerName +
        " is the weineeerrrrrrr!!!!</span>";
    }
  }
};

const clickCell = (i) => {
  return () => {
    const totalPlays = x.length + o.length;
    const occupiedCells = x.concat(o);
    if (gameOver === true) {
      restartBtn.classList.remove("jump-up");
      message.classList.remove("reminder-thing");
      alert("Better restart the game, bucko");
      allCells[i].style.cursor = "default";
      message.innerHTML = "The restart button is over here...";
      message.classList.add("reminder-thing");
      restartBtn.classList.add("jump-up");
    }
    if (
      totalPlays % 2 === 0 && occupiedCells.includes(i) === false && gameOver === false) {
      allCells[i].innerHTML = "X";
      x.push(i);
      playedCells[i] = "x";
      message.innerHTML = "Your move, <b>O</b>!";
      winChecker(x, "X");
    } else if (
      totalPlays % 2 === 1 && occupiedCells.includes(i) === false && gameOver === false) {
      allCells[i].innerHTML = "O";
      o.push(i);
      playedCells[i] = "o";
      message.innerHTML = "Your move, <b>X</b>!";
      winChecker(o, "O");
    }
    if (occupiedCells.includes(i) != true){
        allCells[i].style.cursor = "default";
    }
    if (gameOver == false && occupiedCells.length == 8) {
      alert("WHAT HAVE YOU DONE ?!");
      message.innerHTML = `<span class="now-youve-done-it">NOW YOU'VE DONE IT !!!</span>`;
      const everyCell = document.querySelectorAll("div.cell");
      for (i = 0; i < everyCell.length; i++) {
        everyCell[i].innerHTML = ">:-(";
        everyCell[i].classList.add("oh-shit");
      }
    }
  };
};

for (let i = 0; i < allCells.length; i++) {
  allCells[i].addEventListener("click", clickCell(i));
}

restartBtn.addEventListener("click", () => {
  location.reload();
});
