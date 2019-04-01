let ship = document.getElementById('my-ship');
let body = document.querySelector('body');
let currLeft = window.innerWidth * 0.5 - 50;
let currTop = window.innerHeight * 0.85;
let fireSpeed = 10;
let ghostSpeed = 100;

let invaderObj = [
  {
    name: 'black',
    img: 'url(../images/invade/b.gif)',
    px: 5,
    point: 5
  },
  {
    name: 'red',
    img: 'url(../images/invade/r.png)',
    px: 7,
    point: 7
  }
];


document.addEventListener('keydown', key => {
  if (key.keyCode == 32) {
    fire();
  }
  if (key.keyCode == 37) {
    mvLeft();
  }
  if (key.keyCode == 39) {
    mvRight();
  }
});

const stillOnScreen = (location, direction) => {
  if (direction == "left") {
    if (location > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (location < window.innerWidth - 100) {
      return true;
    } else {
      return false;
    }
  }

}

const mvLeft = () => {
  if (stillOnScreen(currLeft - 10, "left")) {
    currLeft -= 15;
    ship.style.left = `${currLeft}px`;
  }
}

const mvRight = () => {
  if (stillOnScreen(currLeft + 10, "left")) {
    currLeft += 15;
    ship.style.left = `${currLeft}px`;
  }
}

const fire = () => {
  let bullet = document.createElement('div');
  bullet.className = 'bullet';
  let shipCenterHoriz = currLeft + 45;
  let shipCenterVert = currTop + 50;

  console.log(currTop, shipCenterVert, shipCenterHoriz);
  bullet.style.left = `${shipCenterHoriz}px`;
  bullet.style.top = `${shipCenterVert}px`;

  setInterval(() => {
    shipCenterVert -= fireSpeed;

    if (shipCenterVert < 0) {
      bullet.remove();
    }

    contactWithInvader(bullet);
    
    bullet.style.top = `${shipCenterVert}px`;
  }, 100);

  body.appendChild(bullet);
}

setInterval(() => {
  let randLeft = Math.floor(Math.random() * (window.innerWidth - 75));
  let randomObj = invaderObj[0];
  let invader = document.createElement('div');
  invader.className = 'invaders';
  invader.style.left = `${randLeft}px`;
  invader.style.background = randomObj.img;
  invader.style.backgroundRepeat = "no-repeat";
  invader.style.backgroundSize = "contain";
  let currTop = 0;

  setInterval(() => {
    currTop += randomObj.px;
    if(currTop >= window.innerHeight){
      invader.remove();
    }
    invader.style.top = `${currTop}px`;
  }, ghostSpeed);

body.appendChild(invader);
}, 2000);
