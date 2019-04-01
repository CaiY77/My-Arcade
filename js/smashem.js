let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
  'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
let keyCode = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];
let press = [];
let mvSpeed = 2000;
let points = 0;
let score = document.getElementById('scoreBoard');
let body = document.querySelector('body');
let instruc = document.getElementById('instructions');
let currCodes = [];
let reload = document.getElementById('gameover');

const makeKeys = () => {
  for (let i = 0; i < letter.length; i++) {
    let key = {
      letter: letter[i],
      code: keyCode[i]
    }
    press.push(key);
  }
}
makeKeys();

const start = () => {

  instruc.style.display = 'none';
  let spawn = setInterval(() => {
    let aKey = document.createElement('div');
    let rand = Math.floor(Math.random() * press.length);
    let getKeyInfo = press[rand];
    aKey.innerHTML = getKeyInfo.letter;
    aKey.className = "smashKey";
    randSpawn(aKey);
    aKey.style.transition = `${mvSpeed/1000}s`
    currCodes.push(getKeyInfo.code);

    document.addEventListener("keydown", key => {

      if (key.keyCode == getKeyInfo.code) {
        aKey.remove();

        if (mvSpeed > 500) {
          mvSpeed -= 50;
        }

      }

      for (let i = 0; i < currCodes.length; i++) {
        if (key.keyCode == currCodes[i]) {
          points += 10;
          score.innerHTML = points;
          currCodes.splice(i, 1);
        }
      }
    });

    setInterval(() => {
      randLeft = Math.random() * window.innerWidth + "px";
      randTop = Math.random() * window.innerHeight + "px";
      aKey.style.top = randTop;
      aKey.style.left = randLeft;
    }, mvSpeed);

    body.appendChild(aKey);

    console.log(currCodes);

    if(currCodes.length > 30){
      alert(`GAMEOVER!! You scored ${points} points!`);
      clearInterval(spawn);
      reload.style.display = 'block';
    }

  }, 333);

}

const randSpawn = (element) => {
  element.style.top = Math.random() * window.innerHeight + "px";
  element.style.left = Math.random() * window.innerWidth + "px";
}
