let ship = document.getElementById('my-ship');
let body = document.querySelector('body');
let instruc = document.getElementById('instrucInvade');
let score = document.getElementById('scoreBoard');
let lives = document.getElementsByClassName('lives');
let livesContain = document.getElementById('lives-container');
let reload = document.getElementById('gameover');
let currLeft = window.innerWidth * 0.5 - 50;
let currTop = window.innerHeight * 0.85;
let pointArr = [];
let fireSpeed = 25;
let invSpeed = 100;
let points = 0;
let size = 10;
let type = '';
let liveCount = 9;

let invaderObj = [{
    name: 'green',
    img: 'url(../images/invade/g.png)',
    px: 5,
    point: 50
  },
  {
    name: 'red',
    img: 'url(../images/invade/r.png)',
    px: 6,
    point: 75
  },
  {
    name: 'pink',
    img: 'url(../images/invade/p.png)',
    px: 7,
    point: 100
  },
  {
    name: 'blue',
    img: 'url(../images/invade/b.png)',
    px: 8,
    point: 125
  },
  {
    name: 'sky-blue',
    img: 'url(../images/invade/sb.png)',
    px: 9,
    point: 150
  }
];
let power = [{
    name: 'SLOW',
    img: "url(../images/invade/slow.png)"
  },
  {
    name: 'FAST',
    img: "url(../images/invade/fast.png)"
  },
  {
    name: 'BIG',
    img: "url(../images/invade/big.png)"
  }
];

const start = () => {

  instruc.style.display = 'none';

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
    if (stillOnScreen(currLeft + 20, "left")) {
      currLeft -= 40;
      ship.style.left = `${currLeft}px`;
    }
  }

  const mvRight = () => {
    if (stillOnScreen(currLeft + 80, "right")) {
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

    let bulMove = setInterval(() => {
      if (body.contains(bullet)) {
        shipCenterVert -= fireSpeed;

        if (shipCenterVert < 0) {
          bullet.remove();
          clearInterval(bulMove);
        }

        contactWithInvader(bullet, shipCenterVert, shipCenterHoriz);
        contactWithPower(bullet, shipCenterVert, shipCenterHoriz)

        bullet.style.top = `${shipCenterVert}px`;
      }
    }, 100);

    body.appendChild(bullet);
  }

  const contactWithPower = (bullet, top, left) => {
    let all = document.getElementsByClassName("power");
    for (let i = 0; i < all.length; i++) {
      if ((left > all[i].offsetLeft) && (left < all[i].offsetLeft + 75)) {
        if ((top <= all[i].offsetTop + 75) && (top >= all[i].offsetTop)) {
          bullet.remove();
          all[i].remove();
          if (type == 'FAST') {
            fireSpeed = 50;
            setTimeout(() => {
              fireSpeed = 25;
            }, 5000);
          }
          if (type == 'BIG') {
            size = 25;
            setTimeout(() => {
              size = 10;
            }, 5000);
          }
          if (type == 'SLOW') {
            invSpeed = 300;
            setTimeout(() => {
              invSpeed = 100;
            }, 5000);
          }
        }
      }
    }
  }
  const boom = (thing) => {
    thing.style.background = "url(../images/invade/boom.gif)";
    thing.style.backgroundSize = 'contain';
  }

  const contactWithInvader = (bullet, top, left) => {
    let all = document.getElementsByClassName("invaders");
    for (let i = 0; i < all.length; i++) {
      if ((left > all[i].offsetLeft) && (left < all[i].offsetLeft + 75)) {
        if ((top <= all[i].offsetTop + 75) && (top >= all[i].offsetTop)) {
          bullet.remove();
          boom(all[i]);
          setTimeout(() => {
            all[i].remove();
          }, 500);
          points += pointArr[i];
          pointArr.splice(i,1);
          score.innerHTML = points;
        }
      }
    }
  }

  const loseLife = () => {
    lives[liveCount].style.opacity = 0;
    liveCount -= 1;
    if (liveCount < 0) {
      alert(`GAMEOVER! You scored ${points} points!`);
      reload.style.display = 'block';
    }
  }

  //spawn power-ups
  setInterval(() => {
    let powerUp = document.createElement('div');
    powerUp.className = 'power';
    let randPow = power[Math.floor(Math.random() * power.length)];
    let randLeft = Math.floor(Math.random() * (window.innerWidth - 50));
    let randTop = Math.floor(Math.random() * (window.innerHeight - 300));
    powerUp.style.left = `${randLeft}px`;
    powerUp.style.top = `${randTop}px`;
    powerUp.style.background = randPow.img;
    powerUp.style.backgroundRepeat = "no-repeat";
    powerUp.style.backgroundSize = "contain";
    type = randPow.name;
    body.appendChild(powerUp);

    setTimeout(() => {
      powerUp.remove();
    }, 6000);

  }, 15000);

  // spawn random
  setInterval(() => {
    let randLeft = Math.floor(Math.random() * (window.innerWidth - 75));
    let randomObj = invaderObj[Math.floor(Math.random() * invaderObj.length)];
    let invader = document.createElement('div');
    invader.className = 'invaders';
    invader.style.left = `${randLeft}px`;
    invader.style.background = randomObj.img;
    invader.style.backgroundRepeat = "no-repeat";
    invader.style.backgroundSize = "contain";
    pointArr.push(randomObj.point);
    let currTop = 0;

    let objMove = setInterval(() => {
      if (body.contains(invader)) {

        currTop += randomObj.px;
        if (currTop >= window.innerHeight - 50) {
          invader.remove();
          clearInterval(objMove);
          loseLife();
        }
        invader.style.top = `${currTop}px`;

        contactWtihShip(invader, currTop, randLeft);

      }
    }, invSpeed);

    body.appendChild(invader);
  }, 2000);

  const contactWtihShip = (invader, top, left) => {
    if (left >= currLeft && left <= currLeft + 100) {
      if (top + 75 >= currTop) {
        invader.remove();
        loseLife();
      }
    }
    if (top + 75 >= currTop && top + 75 <= currTop + 100) {
      if (left + 75 >= currLeft && left + 75 <= currLeft + 100) {
        invader.remove();
        loseLife();
      }
    }
  }


} // start func
