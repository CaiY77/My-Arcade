let ship = document.getElementById('my-ship');
let body = document.querySelector('body');
let currLeft = window.innerWidth * 0.5 - 50;
let currTop = window.innerHeight * 0.85;
let fireSpeed = 20;
let ghostSpeed = 100;
let score = 0;
let size = 10;

let invaderObj = [{
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
let power = [{
    name: 'slow',
    img: "url(../images/invade/slow.jpeg)"
  },
  {
    name: 'fast',
    img: "url(../images/invade/fast.png)"
  },
  {
    name: 'big',
    img: "url(../images/invade/big.png)"
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
    if (location >= 0) {
      return true;
    } else {
      return false;
    }
  } else {
    if (location <= window.innerWidth) {
      return true;
    } else {
      return false;
    }
  }

}

const mvLeft = () => {
  if (stillOnScreen(currLeft, "left")) {
    currLeft -= 40;
    ship.style.left = `${currLeft}px`;
  }
}

const mvRight = () => {
  if (stillOnScreen(currLeft + 130, "right")) {
    currLeft += 40;
    ship.style.left = `${currLeft}px`;
  }
}

const fire = () => {
  let bullet = document.createElement('div');
  bullet.className = 'bullet';
  let shipCenterHoriz = currLeft + 45;
  let shipCenterVert = currTop + 50;
  bullet.style.left = `${shipCenterHoriz}px`;
  bullet.style.top = `${shipCenterVert}px`;
  bullet.style.width = `${size}px`;
  bullet.style.height = `${size}px`;

  setInterval(() => {
    shipCenterVert -= fireSpeed;

    if (shipCenterVert < 0) {
      bullet.remove();
    }

    contactWithInvader(bullet, shipCenterVert, shipCenterHoriz);

    bullet.style.top = `${shipCenterVert}px`;
  }, 100);

  body.appendChild(bullet);
}

const contactWithInvader = (bullet, top, left) => {
  let all = document.getElementsByClassName("invaders");
  for (let i = 0; i < all.length; i++) {
    if ((left > all[i].offsetLeft) && (left < all[i].offsetLeft + 75)) {
      if ((top <= all[i].offsetTop + 75) && (top >= all[i].offsetTop)) {
        bullet.remove();
        all[i].remove();
        score += 100;
        console.log(score);
      }
    }
  }
}
//spawn power-ups
setInterval(() => {
  let powerUp = document.createElement('div');
  powerUp.className = 'power';
  let randPow = power[Math.floor(Math.random()*power.length)];
  let randLeft = Math.floor(Math.random() * (window.innerWidth - 50));
  let randTop = Math.floor(Math.random() * (window.innerHeight - 50));
  powerUp.style.left = `${randLeft}px`;
  powerUp.style.top = `${randTop}px`;
  powerUp.style.background = randPow.img;
  powerUp.style.backgroundRepeat = "no-repeat";
  powerUp.style.backgroundSize = "contain";
  body.appendChild(powerUp);
}, 20000);

// spawn black
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
    if (currTop >= window.innerHeight) {
      invader.remove();
    }
    invader.style.top = `${currTop}px`;
  }, ghostSpeed);

  body.appendChild(invader);
}, 2500);

// spawn reds
setInterval(() => {
  let randLeft = Math.floor(Math.random() * (window.innerWidth - 75));
  let randomObj = invaderObj[1];
  let invader = document.createElement('div');
  invader.className = 'invaders';
  invader.style.left = `${randLeft}px`;
  invader.style.background = randomObj.img;
  invader.style.backgroundRepeat = "no-repeat";
  invader.style.backgroundSize = "contain";
  let currTop = 0;

  setInterval(() => {
    currTop += randomObj.px;
    if (currTop >= window.innerHeight) {
      invader.remove();
    }
    invader.style.top = `${currTop}px`;
  }, ghostSpeed);

  body.appendChild(invader);
}, 12500);
