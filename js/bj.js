/*###################BlackJack######################*/
let cardPics = [
  "../images/deck/2D.png", "../images/deck/2C.png", "../images/deck/2H.png", "../images/deck/2S.png",
  "../images/deck/3D.png", "../images/deck/3C.png", "../images/deck/3H.png", "../images/deck/3S.png",
  "../images/deck/4D.png", "../images/deck/4C.png", "../images/deck/4H.png", "../images/deck/4S.png",
  "../images/deck/5D.png", "../images/deck/5C.png", "../images/deck/5H.png", "../images/deck/5S.png",
  "../images/deck/6D.png", "../images/deck/6C.png", "../images/deck/6H.png", "../images/deck/6S.png",
  "../images/deck/7D.png", "../images/deck/7C.png", "../images/deck/7H.png", "../images/deck/7S.png",
  "../images/deck/8D.png", "../images/deck/8C.png", "../images/deck/8H.png", "../images/deck/8S.png",
  "../images/deck/9D.png", "../images/deck/9C.png", "../images/deck/9H.png", "../images/deck/9S.png",
  "../images/deck/10D.png", "../images/deck/10C.png", "../images/deck/10H.png", "../images/deck/10S.png",
  "../images/deck/JD.png", "../images/deck/JC.png", "../images/deck/JH.png", "../images/deck/JS.png",
  "../images/deck/QD.png", "../images/deck/QC.png", "../images/deck/QH.png", "../images/deck/QS.png",
  "../images/deck/KD.png", "../images/deck/KC.png", "../images/deck/KH.png", "../images/deck/KS.png",
  "../images/deck/AD.png", "../images/deck/AC.png", "../images/deck/AH.png", "../images/deck/AS.png"
];
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "Jack", "Queen", "King", "Ace"];
const suits = ["Diamonds", "Clubs", "Hearts", "Spades"];
let deck = [];

const buildDeck = () => {
  for (let v = 0; v < values.length; v++) {
    for (let s = 0; s < suits.length; s++) {
      let card = {
        num: values[v],
        suit: suits[s],
        value: v + 2
      }
      deck.push(card);
    }
  }
  for (let i = 0; i < deck.length; i++) {
    deck[i].source = cardPics[i];
  }
  return deck;
}


const suffle = () => {
  let sufDeck = [];
  let rand1 = Math.floor(Math.random() * deck.length);
  let count = 0;

  while (count < 52) {
    sufDeck.push(deck[rand1]);
    deck.splice(rand1, 1);
    rand1 = Math.floor(Math.random() * deck.length);
    count++;
  }

  deck = sufDeck;
}

let currBet = document.getElementById("currBet");
let money = document.getElementById('money');
let confirm = document.getElementById('confirm');
let outcome = document.getElementById('outcome');
let winner = document.getElementById('winner');
let start = 3000;
let myBet = 0;
let dealer = [];
let player = [];
let cpuCards = document.getElementsByClassName('cpu-card');
let myCards = document.getElementsByClassName('my-card');
let myCount = 0;
let cpuCount = 0;
let deal = document.getElementById('deal');
let bet = document.getElementById('bet');
let hit = document.getElementById('hit');
let stand = document.getElementById('stand');
let clap = new Audio();
clap.src = '../audio/clap.mp3';
let boo = new Audio();
boo.src = '../audio/boo.mp3'


const setBet = () => {
  confirm.innerHTML = "$" + myBet;
  currBet.innerHTML = "EXIT";
}

const addBet = (amount) => {
  if (start - amount < 0) {
    alert("Invalid Bet, You're Too Broke!");
  } else {
    start -= amount;
    myBet += amount;
    currBet.innerHTML = "$" + myBet;
    money.innerHTML = "$" + start;
  }
}

const clearBet = () => {
  start += myBet;
  money.innerHTML = "$" + start;
  myBet = 0;
  currBet.innerHTML = "EXIT";
}

const dealCards = () => {
  clean();
  setBet();
  deck = [];
  buildDeck();
  suffle();

  setTimeout(() => {
    player.push(getMyCard());
  }, 300);

  setTimeout(() => {
    dealer.push(getCpuCard());
  }, 600);

  setTimeout(() => {
    player.push(getMyCard());
  }, 900);

  deal.style.display = "none";
  bet.style.display = "none";
  hit.style.display = "block";
  stand.style.display = "block";

}

const getMyCard = () => {
  let cardP = deck[0];
  myCards[myCount].src = cardP.source;
  myCount++;
  deck.splice(0, 1);
  changeVal(cardP);
  return cardP;
}

const getCpuCard = () => {
  let cardD = deck[0];
  cpuCards[cpuCount].src = cardD.source;
  cpuCount++;
  deck.splice(0, 1);
  changeVal(cardD);
  return cardD;
}

const changeVal = (myCard) => {
  if (myCard.num == "King" || myCard.num == "Queen" || myCard.num == "Jack") {
    myCard.value = 10;
  }
  if (myCard.num == "Ace") {
    myCard.value = 11;
  }
}
const hitMe = () => {
  player.push(getMyCard());
  if (player.length == 5) {
    outcome.innerHTML = "FIVE CARD, NO BUST!";
    winner.innerHTML = "PLAYER WINS!!!";
    payMe();
  }
  if (mySum() > 21) {
    dealer.push(getCpuCard());
    playerLose();
  }
}

const mySum = () => {
  let sum = 0;
  for (let i = 0; i < player.length; i++) {
    sum += player[i].value;
  }

  if (sum > 21) {
    sum = hasAces(player,sum);
  }

  return sum;
}

const hasAces = (hand,sum) => {
  let aceCounter = 0;
  for(let i = 0; i < hand.length; i++){
    if(hand[i].num == "Ace"){
      aceCounter++;
    }
  }
  while (aceCounter > 0){
    sum -= 10;
    aceCounter--;

    if(sum <= 21){
      break;
    }

  }
  return sum;
}

const cpuSum = () => {
  let sumD = 0;
  for (let i = 0; i < dealer.length; i++) {
    sumD += dealer[i].value;
  }

  if (sumD > 21) {
    sumD = hasAces(dealer,sumD);
  }

  return sumD;
}

const playerLose = () => {
  boo.play();
  outcome.innerHTML = `Player: ${mySum()} Dealer: ${cpuSum()}`;
  winner.innerHTML = "DEALER WINS!!!";
  confirm.innerHTML = "$0";
  myBet = 0;
  reset();
}

const clean = () => {
  outcome.innerHTML = "";
  winner.innerHTML = "";

  for (let i = 0; i < myCards.length; i++) {
    myCards[i].src = "../images/deck/gray_back.png";
  }

  for (let i = 0; i < cpuCards.length; i++) {
    cpuCards[i].src = "../images/deck/blue_back.png";
  }
  myCount = 0;
  cpuCount = 0;
  player = [];
  dealer = [];
}

const stay = () => {
  if (mySum() == 21) {
    outcome.innerHTML = "BLACKJACK!"
    winner.innerHTML = "PLAYER WINS!!!"
    payMe();
  } else {
    hitCpu();
  }
}

const hitCpu = () => {
  let cpu = 0
  dealer.push(getCpuCard());
  cpu = cpuSum();

  while (cpu < 16) {
    dealer.push(getCpuCard());

    cpu = cpuSum();
    if (dealer.length == 5 && cpu < 22) {
      boo.play();
      outcome.innerHTML = "FIVE CARD, NO BUST!";
      winner.innerHTML = "DEALER WINS!!!";
      confirm.innerHTML = "$0";
      reset();
      break;
    }
  }

  if (cpuSum() > 21) {
    outcome.innerHTML = "DEALER BUST!"
    winner.innerHTML = "PLAYER WINS!!!"
    payMe();
  } else if (cpuSum() > mySum()) {
    playerLose();
  } else {
    outcome.innerHTML = `Player: ${mySum()} Dealer: ${cpuSum()}`;
    winner.innerHTML = "PLAYER WINS!!!"
    payMe();
  }

}
const reset = () => {
  deal.style.display = "block";
  bet.style.display = "block";
  hit.style.display = "none";
  stand.style.display = "none";
}

const payMe = () => {
  clap.play();
  confirm.innerHTML = "$0";
  reset();
  myBet += myBet;
  start += myBet;
  money.innerHTML = "$" + start;
  myBet = 0;
}
/*###################BlackJack######################*/
