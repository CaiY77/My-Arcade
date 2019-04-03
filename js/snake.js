let board = document.getElementById('snake-container');
let boxes = document.getElementsByClassName('single-box');
let direction = 'right';
let snakeArr = [];

class Node {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(row, col) {
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
  }

  move(direction) {
    let current = this.head;
    let newRow = current.row;
    let newCol = current.col;

    if (direction == 'up' && check(current.row - 1, current.col)) {
      snakeArr[current.row][current.col] = 0;
      current.row -= 1;
      snakeArr[current.row][current.col] = 1;
    } else if (direction == 'down' && check(current.row + 1, current.col)) {
      snakeArr[current.row][current.col] = 0;
      current.row += 1;
      snakeArr[current.row][current.col] = 1;
    } else if (direction == 'left' && check(current.row, current.col - 1)) {
      snakeArr[current.row][current.col] = 0;
      current.col -= 1;
      snakeArr[theHead.row][theHead.col] = 1;
      updateGame();
    } else if (direction == "right" && check(current.row, current.col + 1)) {
      snakeArr[current.row][current.col] = 0;
      current.col += 1;
      snakeArr[current.row][current.col] = 1;
    }

    current = current.next;

    while (current != null) {
      
      let rowHold = current.row;
      let colHold = current.col;
      snakeArr[rowHold][colHold] = 0;
      current.row = newRow;
      current.col = newCol;
      snakeArr[newRow][newCol] = 1;



      current = current.next;
    }

    updateGame();
  }

}

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
  snakeArr[17][1] = 1;
  updateGame();
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
    return false;
  } else if (snakeArr[row][col] == 0) {
    return true;
  } else if (snakeArr[row][col] == 1) {
    // youLose();
    return true;
  } else if (snakeArr[row][col] == 2) {
    // eat();
    return true;
  }
}

initializeGame();

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

setInterval(() => {
  mySnake.move(direction);
}, 100);
