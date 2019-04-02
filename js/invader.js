let ship = document.getElementById('my-ship');
let body = document.querySelector('body');
let instruc = document.getElementById('instrucInvade');
let score = document.getElementById('scoreBoard');
let currLeft = window.innerWidth * 0.5 - 50;
let currTop = window.innerHeight * 0.85;
let fireSpeed = 25;
let invSpeed = 100;
let points = 0;
let size = 10;
let type = '';

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
    if (stillOnScreen(currLeft + 40, "left")) {
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
      contactWithPower(bullet, shipCenterVert, shipCenterHoriz)

      bullet.style.top = `${shipCenterVert}px`;
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
            fireSpeed = 100;
            setTimeout(() => {
              fireSpeed = 25;
            }, 5000);
          }
          if (type == 'BIG') {
            size = 30;
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

  const contactWithInvader = (bullet, top, left) => {
    let all = document.getElementsByClassName("invaders");
    for (let i = 0; i < all.length; i++) {
      if ((left > all[i].offsetLeft) && (left < all[i].offsetLeft + 75)) {
        if ((top <= all[i].offsetTop + 75) && (top >= all[i].offsetTop)) {
          bullet.remove();
          all[i].remove();
          points += 100;
          score.innerHTML = points;
        }
      }
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
      if (currTop >= window.innerHeight - 50) {
        invader.remove();
      }
      invader.style.top = `${currTop}px`;
    }, invSpeed);

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
      if (currTop >= window.innerHeight - 50) {
        invader.remove();
      }
      invader.style.top = `${currTop}px`;
    }, invSpeed);

    body.appendChild(invader);
  }, 12500);
}
