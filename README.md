# WELCOME TO CAI'S ARCADE

Welcome to my arcade. Enjoy my personalized remake/creation of these games using HTML/CSS and a lot of javascript.

1) BlackJack
2) Smash'em All
3) Space Invaders 2.0
4) TBD

Switch out of each game when ever you feel like it. If you lose, hate the player not the game!


# BlackJack

Gambling doesn't get any better than this! This is a risk-free functioning blackjack game! That means if you lose you won't get bankrupt. This game runs by regular Blackjack rules, 8 decks will be used at a time (this means you won't be able to count card). Closest to 21 wins, anything over 21 is a bust. Numerical cards retain their values, picture cards are value of 10 and Aces are 11/1 interchangeably by needs. When you win, you receive double your bet. Dealer will ALWAYS hit until their hand is greater than 16.

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
#Smash'em All


# Alien Invasion 2.0

My own twist on the classic Alien Invasion game. Game will contain a ship of some sort which can be controlled with up, down, left, right keys.
Objects of various sizes will spawn and random location and each will descend at different speeds. Player can shoot falling object. Player has 5 lives, each object that gets pass the ship will result in -1, if ship comes in contact with object, -1. Random buffs will also spawn at random locations that will enhance ships features (ex. fire-rate, clear-all, slow-motion...etc).

HTML, CSS, JS


*ANTICIPATED DIFFICULTY*
- The use of unit collision without a grid.

*POTENTIAL SOLUTIONS*
- research research research! Use blerf classwork for general idea.
