/*########MAIN PAGE#######################################*/
let body = document.querySelector('body');

let randObj = [{
    img: "url(../images/sonic.gif)",
    speed: 4
  },
  {
    img: "url(../images/goku.gif)",
    speed: 4
  },
  {
    img: "url(../images/turtle.gif)",
    speed: 2
  },
  {
    img: "url(../images/ghost.gif)",
    speed: 1
  }
];

setInterval(()=>{
let startPosition = -150;
let randChar = document.createElement('div');
let who = randObj[Math.floor(Math.random() * randObj.length)];
let randHeight = Math.floor(Math.random() * window.innerHeight);
randChar.className = "object";
randChar.style.background = who.img;
randChar.style.top = randHeight + "px";
randChar.style.backgroundSize = "contain";
randChar.style.backgroundPosition = "center";
randChar.style.backgroundRepeat = "no-repeat";

setInterval(() => {
  if (startPosition > window.innerWidth + 150) {
    randChar.remove();
  } else{
    startPosition += who.speed;
    randChar.style.left = startPosition +"px";
  }
}, 5);

body.appendChild(randChar);

}, 1000);




/*########MAIN PAGE#######################################*/
