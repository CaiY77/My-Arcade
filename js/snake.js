let board = document.getElementById('snake-container');
let boxes = document.getElementsByClassName('single-box');
let wallScore = document.getElementById('wall-score');
let wall = document.getElementById('wall');
let consume = document.getElementById('eat');
let eatScore = document.getElementById('eat-score');
let updatePoints = document.getElementById('snake-score');
let direction = 'right';
let snakeArr = [];
let mySnake;
let movingInterval;
let speed = 400;
let points = 0;
let moveAudio = new Audio();
moveAudio.src = '../audio/move.mp3';
let eatAudio = new Audio();
eatAudio.src = '../audio/bite.mp3';
let loseAudio = new Audio();
loseAudio.src = '../audio/lose.mp3';

class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.next = null;
  }
} //Node class

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(row, col) {
    snakeArr[row][col] = 1;
    let node = new Node(row, col);
    let current;
    if (this.head == null) {
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
    updateGame();
  }

  move(direction) {
    let current = this.head;
    let newRow = current.row;
    let newCol = current.col;

    if (direction == 'up' && check(current.row - 1, current.col)) {
      snakeArr[current.row][current.col] = 0;
      current.row -= 1;
      snakeArr[current.row][current.col] = 1;
      moveRest();
    } else if (direction == 'down' && check(current.row + 1, current.col)) {
      snakeArr[current.row][current.col] = 0;
      current.row += 1;
      snakeArr[current.row][current.col] = 1;
      moveRest();
    } else if (direction == 'left' && check(current.row, current.col - 1)) {
      snakeArr[current.row][current.col] = 0;
      current.col -= 1;
      snakeArr[current.row][current.col] = 1;
      moveRest();
    } else if (direction == "right" && check(current.row, current.col + 1)) {
      snakeArr[current.row][current.col] = 0;
      current.col += 1;
      snakeArr[current.row][current.col] = 1;
      moveRest();
    }

    function moveRest() {
      current = current.next;
      while (current != null) {
        let rowHold = current.row;
        let colHold = current.col;
        snakeArr[rowHold][colHold] = 0;
        current.row = newRow;
        current.col = newCol;
        snakeArr[newRow][newCol] = 1;
        newRow = rowHold;
        newCol = colHold;
        current = current.next;
      }
    }
    updateGame();
  } // move Method

  findLastRow() {
    let current = this.head;
    let row;
    while (current != null) {
      row = current.row;
      current = current.next;
    }
    return row;
  }

  findLastCol() {
    let current = this.head;
    let col;
    while (current != null) {
      col = current.col;
      current = current.next;
    }
    return col;
  }

} // LinkedList Class

const initializeGame = () => {
  document.getElementById('play-snake').style.display = 'none';
  mySnake = new LinkedList();
  for (let row = 0; row < 35; row++) {
    snakeArr[row] = [];
    for (let col = 0; col < 35; col++) {
      snakeArr[row][col] = 0;
      let tinyBox = document.createElement('div');
      tinyBox.className = ('single-box');
      board.appendChild(tinyBox);
    }
  }
  mySnake.add(17, 1);
  setTimeout(startMoving(speed), 1000);
  spawnFood();
}

const updateGame = () => {
  for (let row = 0; row < 35; row++) {
    for (let col = 0; col < 35; col++) {
      if (snakeArr[row][col] == 1) {
        boxes[row * 35 + col].style.background = "red";
      } else if (snakeArr[row][col] == 2) {
        boxes[row * 35 + col].style.background = "url(../images/snake/mouse.png)";
        boxes[row * 35 + col].style.backgroundSize = "cover";
        boxes[row * 35 + col].style.backgroundRepeat = "no-repeat";
      } else {
        boxes[row * 35 + col].style.background = "rgb(34, 162, 66)";
      }
    }
  }
}

const check = (row, col) => {
  if (row < 0 || col < 0 || row > 34 || col > 34) {
    loseAudio.play();
    wall.style.display = 'block';
    wallScore.innerHTML = `YOU SCORED ${points} POINTS!!!`;
    clearInterval(movingInterval);
    return false;
  } else if (snakeArr[row][col] == 0) {
    return true;
  } else if (snakeArr[row][col] == 1) {
    loseAudio.play();
    consume.style.display = 'block';
    eatScore.innerHTML = `YOU SCORED ${points} POINTS!!!`;
    clearInterval(movingInterval);
    return false;
  } else if (snakeArr[row][col] == 2) {
    points += 100;
    eat(row, col);
    updatePoints.innerHTML = points;
    return true;
  }
}

document.addEventListener('keydown', key => {
  if (key.keyCode == 37 || key.keyCode == 65) {
    direction = 'left';
  }
  if (key.keyCode == 38 || key.keyCode == 87) {
    direction = 'up';
  }
  if (key.keyCode == 39 || key.keyCode == 68) {
    direction = 'right';
  }
  if (key.keyCode == 40 || key.keyCode == 83) {
    direction = 'down';
  }
});

const eat = (row, col) => {
  eatAudio.play();
  snakeArr[row][col] = 0;
  mySnake.add(mySnake.findLastRow(), mySnake.findLastCol());
  spawnFood();
  if (speed > 50) {
    speed -= 25;
    clearInterval(movingInterval);
    startMoving(speed);
  }
  eatAudio.currentTime = 0;
}

const startMoving = (speed) => {
  movingInterval = setInterval(() => {
    moveAudio.play();
    mySnake.move(direction);
    moveAudio.currentTime = 0;
  }, speed);
}

const spawnFood = () => {
  let row = Math.floor(Math.random() * 35);
  let col = Math.floor(Math.random() * 35);
  while (snakeArr[row][col] != 0) {
    row = Math.floor(Math.random() * 35);
    col = Math.floor(Math.random() * 35);
  }
  snakeArr[row][col] = 2;
  updateGame();
}
