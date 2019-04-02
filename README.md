# WELCOME TO CAI'S ARCADE

Welcome to my arcade. Enjoy my personalized remake/creation of these games using HTML/CSS and a lot of javascript.

1) BlackJack
2) Smash'em All
3) Space Invaders 2.0
4) TBD

Switch out of each game when ever you feel like it. If you lose, hate the player not the game!


# BlackJack

Gambling doesn't get any better than this! This is a risk-free functioning blackjack game! That means if you lose you won't get bankrupt. This game runs by regular Blackjack rules, 8 decks will be used at a time (this means you won't be able to count card). Closest to 21 wins, anything over 21 is a bust. Numerical cards retain their values, picture cards are value of 10 and Aces are 11/1 interchangeably by needs. When you win, you receive double your bet. Dealer will ALWAYS hit until their hand is greater than 16. There are a substantial amount of javascript to cover each and every possible outcome weather it's player win, player bust, dealer win... etc. Round of applause when you win a hand and a boo when you lose one. Lose all your money a stupid all-in or just being bad? Re-fresh the game and you'll be back with the starting amount of cash.

### No Double Down :( ###

```javascript

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
  for (let d = 0; d < 7; d++) {
    for (let c = 0; c < 52; c++) {
      deck.push(deck[c]);
    }
  }
  console.log(deck);
  return deck;
}

```
# Smash'em All

Innovation at its finest. I present to you Smash'em All. This is a typing game. Purpose of this game to show my understanding of class materials and how I effectively apply these skills. Inspiration of this game comes from, one, the need for coders to type fast and two, the need to create an annoying game. There are uses of CSS that will make this game harder than it should be and addition JS to really drive you nuts. Rules are simple. See a capitalization of a letter? press the corresponding lowercase letter to remove. Each remove is rewarded 10 points. Game is over if 50 letters are present on the screen. If more than 1 of the same letter is present, pressing the corresponding lowercase letter will remove all. The last rule is actually a disadvantage... Each letter removed will result in the increase in the letter's movement. GoodLuck! Enjoy the game and try not to get too dizzy.

```javascript
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
        mvSpeed -= 25;
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

  if(currCodes.length > 30){
    alert(`GAMEOVER!! You scored ${points} points!`);
    clearInterval(spawn);
    reload.style.display = 'block';
  }

}, 333);
```

# Space Invasion 2.0

Old but gold, I present my own twist on the classic Space Invasion game. Game will contain a ship of some sort which can be controlled with up, down, left, right keys. Objects of various speeds will spawn and random location and each will descend at different speeds. Player can shoot falling object. Player has 10 lives, each object that gets pass the ship will result in -1, if ship comes in contact with object, -1. Random buffs will also spawn at random locations that will enhance ships features (ex. fire-rate, clear-all, slow-motion...etc). With the use of javascript these invaders can spawn anywhere, be careful.
```javascript
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
```
