let board = document.getElementById('snake-container');
let boxes = document.getElementsByClassName('single-box');
let direction = 'right';
let snakeArr = [];
let speed = 500;
let points = 0;

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

    function moveRest(){
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

}// LinkedList Class

let mySnake = new LinkedList();

const initializeGame = () => {
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
  setTimeout(startMoving, 1000);
  spawnFood();
}

const updateGame = () => {
  for (let row = 0; row < 35; row++) {
    for (let col = 0; col < 35; col++) {
      if (snakeArr[row][col] == 1) {
        boxes[row * 35 + col].style.background = "white";
      } else if (snakeArr[row][col] == 2) {
        boxes[row * 35 + col].style.background = "red";
      } else {
        boxes[row * 35 + col].style.background = "black";
      }
    }
  }
}

const check = (row, col) => {
  if (row < 0 || col < 0 || row > 34 || col > 34) {
    // youLose();
    return false;
  } else if (snakeArr[row][col] == 0) {
    return true;
  } else if (snakeArr[row][col] == 1) {
    // youLose();
    return false;
  } else if (snakeArr[row][col] == 2) {
    points += 100;
    eat(row, col);
    return true;
  }
}

document.addEventListener('keydown', key => {
  if (key.keyCode == 37) {
    direction = 'left';
  }
  if (key.keyCode == 38) {
    direction = 'up';
  }
  if (key.keyCode == 39) {
    direction = 'right';
  }
  if (key.keyCode == 40) {
    direction = 'down';
  }
});

const eat = (row, col) => {
  snakeArr[row][col] = 0;
  mySnake.add(mySnake.findLastRow(), mySnake.findLastCol());
  spawnFood();
  if (speed > 50) {
    speed -= 50;
  }
}

const startMoving = () => {
  setInterval(() => {
    mySnake.move(direction);
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
